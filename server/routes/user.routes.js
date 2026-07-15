const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");
const { getMe,
    searchUsers,
 } = require("../controllers/user.controller");

router.get("/me", protect, getMe);
router.get("/search", protect, searchUsers);

module.exports = router;