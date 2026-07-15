const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createChat,
  getMyChats,
} = require("../controllers/chat.controller");

router.post("/", protect, createChat);
router.get("/", protect, getMyChats);

module.exports = router;