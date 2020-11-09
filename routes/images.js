const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Image = require("../models/image");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dirName = path.join(process.cwd(), "./files/");
    console.log(dirName);
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    cb(null, dirName);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const images = await Image.find().select("-__v").sort("img");
  res.send(images);
});

router.post("/", [auth, upload.single("image")], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const data = {
    image: req.file.path,
  };
  const result = await cloudinary.uploader.upload(data.image);
  let image = new Image({
    img: result.url,
  });
  image = await image.save();

  res.send(image);
});

// router.put("/:id", [auth, validateObjectId], async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findByIdAndUpdate(
//     req.params.id,
//     { name: req.body.name },
//     {
//       new: true,
//     }
//   );

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

// router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

// router.get("/:id", validateObjectId, async (req, res) => {
//   const genre = await Genre.findById(req.params.id).select("-__v");

//   if (!genre)
//     return res.status(404).send("The genre with the given ID was not found.");

//   res.send(genre);
// });

module.exports = router;
