const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createChat,
  getMyChats,
  searchChats,
  togglePinChat,
  toggleArchiveChat,
  toggleMuteChat,
  deleteChat,
} = require("../controllers/chat.controller");


// ======================================================
// Create Personal Chat
// ======================================================
router.post("/", protect, createChat);

// ======================================================
// Get All Chats
// ======================================================
router.get("/", protect, getMyChats);

// ======================================================
// Search Chats
// Example:
// /api/chat/search?query=rahul
// ======================================================
router.get("/search", protect, searchChats);

// ======================================================
// Pin / Unpin Chat
// ======================================================
router.patch("/:chatId/pin", protect, togglePinChat);

// ======================================================
// Archive / Unarchive Chat
// ======================================================
router.patch("/:chatId/archive", protect, toggleArchiveChat);

// ======================================================
// Mute / Unmute Chat
// ======================================================
router.patch("/:chatId/mute", protect, toggleMuteChat);

// ======================================================
// Soft Delete Chat
// ======================================================
router.delete("/:chatId", protect, deleteChat);



module.exports = router;