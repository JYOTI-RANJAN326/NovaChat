const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  uploadPDF,
  askPDF,
} = require("../controllers/pdf.controller");

router.post("/upload", protect, upload.single("pdf"), uploadPDF);

router.post("/chat", protect, askPDF);

module.exports = router;