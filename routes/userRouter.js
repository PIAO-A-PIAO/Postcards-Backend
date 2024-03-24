const express = require('express');
const {
  updateBackgroundColor, getUserBackgroundColor, loginUser, verifyLink, getUserToken, getUserById,
  getUserSchool, deleteUser, sendVerificationLink, sendCode
} = require('../controllers/userController');
const router = express.Router();

router.get("/get-all-user", (req, res) => {
  res.send("DEPRECATED");
});

// Update the user's background color preference
router.post('/save-user-background-color', updateBackgroundColor);

// Get the user's background color preference
router.post('/get-user-background-color', getUserBackgroundColor);

router.post("/login", loginUser);
router.post("/register", sendVerificationLink);
router.get("/verifyMail/:token", verifyLink);
router.post("/google-login", getUserToken);
router.post("/sendcode", sendCode);

router.post("/get-user", getUserById);
router.post("/get-user-school", getUserSchool);
router.post("/delete-user", deleteUser);

module.exports = router;
