const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

// Register a new user
exports.signup = async (req, res) => {
  try {
    // Create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    // Set role (default to 'user' if not specified)
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      user.roles = roles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: 'user' });
      user.roles = [role._id];
    }

    // Save user to database
    await user.save();

    res.send({ message: 'User was registered successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Login user
exports.signin = async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({ username: req.body.username }).populate('roles');
    
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    // Get user roles
    const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

    // Send response with user details
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get user profile (protected route)
exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password').populate('roles');
    
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: authorities
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};