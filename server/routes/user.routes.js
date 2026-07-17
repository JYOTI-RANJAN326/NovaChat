const express = require("express");
const upload=
require("../middlewares/upload.middleware");

const router = express.Router();

const {
  protect,
} = require("../middlewares/auth.middleware");

const {
    getMe,
    searchUsers,
    updateProfile,
    changePassword,
    updateAvatar,
} = require("../controllers/user.controller");

router.get("/me", protect, getMe);

router.get("/search", protect, searchUsers);

router.patch("/profile", protect, updateProfile);

router.patch("/password", protect, changePassword);
router.patch(

"/avatar",

protect,

upload.single("image"),

updateAvatar

);

module.exports = router;