const router = require("express").Router();
const Template = require("../models/template.model");
const User = require("../models/user.model");
const minimal = require("../templates/minimal/minimal");
const material = require("../templates/material/material");
const modern = require("../templates/modern/modern");
const puppeteer = require("puppeteer");

async function printPDF(data) {
  if (data.type === "minimal") {
    htmlData = minimal(data);
  } else if (data.type === "material") {
    htmlData = material(data);
  } else if (data.type === "modern") {
    htmlData = modern(data);
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlData);
  const pdf = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();
  return pdf;
}

router.post("/resume_data", async (req, res) => {
  const { email } = req.body;
  const resume_data = await User.findOne({ email: email }).populate("template");
  if (resume_data) {
    res.status(200).json(resume_data);
  } else {
    res.status(404).json({ error: "No resume data found" });
  }
});

router.post("/resume", async (req, res) => {
  const { data } = req.body;
  printPDF(data)
    .then((pdf) => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(pdf);
    })
    .catch((err) => {
      res.status(500).json({ error: "Some Error occurerd !" });
    });
});

router.post("/delete", async (req, res) => {
  const { id, email } = req.body;
  const template = await Template.findById(id);
  if (template) {
    await Template.deleteOne({ _id: id });
    await User.updateOne({ email: email }, { $pull: { template: id } });
    const resume_data = await User.findOne({ email: email }).populate("template");
    if (resume_data) {
      res.status(200).json(resume_data);
    } else {
      res.status(404).json({ error: "No resume data found" });
    }
  } else {
    res.status(404).json({ error: "No template found" });
  }
});

router.post("/update/:id", async (req, res) => {
  const { data } = req.body;
  const { id } = req.params;
  const template = await Template.findById(id);
  if(template){
    await Template.updateOne({ _id: id }, { $set: { data: data } });
    printPDF(data)
    .then((pdf) => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(pdf);
    })
    .catch((err) => {
      res.status(500).json({ error: "Some Error occurerd !" });
    });
  }
  else{
    res.status(404).json({ error: "No template found" });
  }
});

router.post("/resume_id", async (req, res) => {
  const { id } = req.body;
  const template = await Template.findById(id);
  if (template) {
    res.status(200).json(template.data);
  } else {
    res.status(404).json({ error: "No template found" });
  }
});

module.exports = router;