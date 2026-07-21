const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createGroup,
  getMyGroups,
  getGroupDetails,
  renameGroup,
  addMember,
  removeMember,
  makeAdmin,
  removeAdmin,
  leaveGroup,
  deleteGroup,
} = require("../controllers/group.controller");

router.use(protect);

router.post("/", createGroup);

router.get("/", getMyGroups);
router.get("/:chatId", getGroupDetails);

router.put("/:chatId/rename", renameGroup);

router.put("/:chatId/add-member", addMember);
router.put("/:chatId/remove-member", removeMember);

router.put("/:chatId/make-admin", makeAdmin);
router.put("/:chatId/remove-admin", removeAdmin);

router.put("/:chatId/leave", leaveGroup);

router.delete("/:chatId", deleteGroup);

module.exports = router;