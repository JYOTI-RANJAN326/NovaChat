const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload.middleware");

const {
  uploadFile,
} = require("../controllers/upload.controller");

const {
  protect,
} = require("../middlewares/auth.middleware");

router.post(
  "/",
  protect,
  upload.single("file"),
  uploadFile
);

module.exports = router;