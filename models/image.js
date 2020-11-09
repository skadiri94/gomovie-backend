var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  img: String,
});

const Image = mongoose.model("Image", imageSchema);

exports.Image = Image;
