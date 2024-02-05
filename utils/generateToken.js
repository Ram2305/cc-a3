const crypto = require('crypto');

// Generate token using HMAC-SHA1
const generateToken = (userId) => {
  const expiryDate = (Date.now() + 24 * 60 * 60 * 1000).toString(); // Token expires after 24 hours
  const signature = crypto.createHmac('sha1', process.env.TOKEN_SECRET)
                          .update(`${userId}|${expiryDate}`)
                          .digest('hex');

  return `${userId}|${expiryDate}|${signature}`;
};

module.exports = generateToken;
