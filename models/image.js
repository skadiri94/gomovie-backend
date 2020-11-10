const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Image = mongoose.model("Image", imageSchema);

exports.imageSchema = imageSchema;
exports.Image = Image;
