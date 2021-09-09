const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});
const upload = multer({ storage });

router.get("/test", (req, res) =>
  res.json({
    message: "Upload api is works",
  })
);

router.post("/", upload.single("image"), async (req, res) => {
  return res.json({ fileName: req.file.filename });
});

module.exports = router;
