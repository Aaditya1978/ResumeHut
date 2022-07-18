const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    template: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TemplateData",
      },
    ]
  },
  { collection: "user" }
);

const model = mongoose.model("UserData", User);

module.exports = model;