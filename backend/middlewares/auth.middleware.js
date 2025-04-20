const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('roles');
    const isAdmin = user.roles.some(role => role.name === 'admin');
    
    if (isAdmin) {
      next();
      return;
    }

    res.status(403).send({ message: 'Require Admin Role!' });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const authJwt = {
  verifyToken,
  isAdmin
};

module.exports = authJwt;