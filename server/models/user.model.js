const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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