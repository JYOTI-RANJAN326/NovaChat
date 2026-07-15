const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createGroup,
  renameGroup,
  addMembers,
  removeMember,
  leaveGroup,
  makeAdmin,
removeAdmin,
deleteGroup,
} = require("../controllers/group.controller");

router.post("/", protect, createGroup);

router.patch("/:groupId/rename", protect, renameGroup);

router.patch("/:groupId/add-members", protect, addMembers);

router.patch("/:groupId/remove-member", protect, removeMember);
router.patch("/:groupId/leave", protect, leaveGroup);
router.patch("/:groupId/make-admin", protect, makeAdmin);

router.patch("/:groupId/remove-admin", protect, removeAdmin);

router.delete("/:groupId", protect, deleteGroup);

module.exports = router;