const router = require("express").Router();
const puppeteer = require("puppeteer");
const minimal = require("../templates/minimal/minimal");
const material = require("../templates/material/material");
const modern = require("../templates/modern/modern");
const Template = require("../models/template.model");
const User = require("../models/user.model");

async function printPDF(data) {
  let htmlData;
  if (data.type === "minimal") {
    htmlData = await minimal(data);
  }
  else if (data.type === "material") {
    htmlData = await material(data);
  }
  else if (data.type === "modern") {
    htmlData = await modern(data);
  }
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(htmlData, { waitUntil: ['domcontentloaded', 'load', "networkidle0"] });
  const pdf = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();
  return pdf;
}

router.post("/resume", async (req, res) => {
  const { data } = req.body;
  printPDF(data)
    .then((pdf) => {
      User.findOne({ userName: data.userName }).then(async(user) => {
        const template = new Template({
          id: (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2),
          type: data.type,
          data: data,
          user: user,
        });
        await template.save();
        user.template.push(template);
        await user.save();
        res.set({
          "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
        });
        res.end(pdf);
      });
    })
    .catch((err) => {
      res.status(500).send({ error: "some error occured !!" });
    });
});

module.exports = router;
