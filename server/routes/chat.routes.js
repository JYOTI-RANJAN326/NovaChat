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
const {
  createGroup,
  renameGroup,
  addMembers,
  removeMember,
  makeAdmin,
  removeAdmin,
  leaveGroup,
} = require("../controllers/group.controller");

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

router.post("/group", protect, createGroup);

router.patch(
  "/group/:groupId/rename",
  protect,
  renameGroup
);

router.patch(
  "/group/:groupId/add-member",
  protect,
  addMembers
);

router.patch(
  "/group/:groupId/remove-member",
  protect,
  removeMember
);

router.patch(
  "/group/:groupId/make-admin",
  protect,
  makeAdmin
);

router.patch(
  "/group/:groupId/remove-admin",
  protect,
  removeAdmin
);

router.patch(
  "/group/:groupId/leave",
  protect,
  leaveGroup
);

module.exports = router;