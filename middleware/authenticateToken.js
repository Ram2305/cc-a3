const crypto = require('crypto');
const User = require('../models/userModel'); // Make sure this path is correct

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const [userId, expiryDate, signature] = token.split('|');

  // Verify if the token has expired
  if (Date.now() > parseInt(expiryDate)) {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Recreate the signature and compare to the provided signature
  const expectedSignature = crypto.createHmac('sha1', process.env.TOKEN_SECRET)
                                  .update(`${userId}|${expiryDate}`)
                                  .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  // Check if the user exists
  User.findByPk(userId).then(user => {
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.user = user;
    next();
  }).catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
};

module.exports = authenticateToken;
