const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

// Private routes that require token
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);
router.delete("/profile", auth, deleteUserProfile);

module.exports = router;
