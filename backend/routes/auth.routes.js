const express = require('express');
const authController = require('../controllers/auth.controller');
const verifySignUp = require('../middlewares/verifySignup');
const authJwt = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  authController.signup
);

router.post('/signin', authController.signin);

router.get('/profile', [authJwt.verifyToken], authController.userProfile);

router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
  res.json({ message: 'Admin content.' });
});

module.exports = router;