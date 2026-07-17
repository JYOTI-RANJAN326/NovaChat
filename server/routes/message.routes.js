const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
    sendMessage,
    getMessages,
    editMessage,
    deleteForMe,
    deleteForEveryone,
    toggleReaction,
    markAsSeen,
    toggleStarMessage,
    togglePinMessage,
} = require("../controllers/message.controller");

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, getMessages);
router.patch("/:messageId", protect, editMessage);
router.patch("/:messageId/delete-for-me", protect, deleteForMe);

router.patch("/:messageId/delete-for-everyone", protect, deleteForEveryone);
router.patch("/:messageId/toggle-reaction", protect, toggleReaction);
router.patch("/:chatId/seen", protect, markAsSeen);
router.patch(
  "/:messageId/star",
  protect,
  toggleStarMessage
);
router.patch(
  "/:messageId/pin",
  protect,
  togglePinMessage
);
module.exports = router;