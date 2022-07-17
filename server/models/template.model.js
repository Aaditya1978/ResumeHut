const mongoose = require("mongoose");

const Template = new mongoose.Schema(
  {
    id: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
    }
  },
  { collection: "template" }
);

const model = mongoose.model("TemplateData", Template);

module.exports = model;