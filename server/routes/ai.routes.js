const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
    askAI,
    getChatHistory,
    clearChatHistory,
    codeChat,
} = require("../controllers/ai.controller");

router.post("/chat", protect, askAI);

router.post("/code-chat", protect, codeChat);
router.get("/history", protect, getChatHistory);
router.delete("/history", protect, clearChatHistory);

module.exports = router;