const express = require('express');
const router = express.Router();
const User = require('../../models/userModel'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken'); // Utility to generate tokens
const authenticateToken = require('../../middleware/authenticateToken'); // Middleware for token validation

// Hash a password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

router.post('/', async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { username: req.body.username } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before saving the new user
    const hashedPassword = await hashPassword(req.body.password);

    // Create new user with hashed password
    const newUser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword // Store the hashed password
    });

    // Generate a token for the new user
    const token = generateToken(newUser.id);

    // Omit the password from the response and include the token
    const { password, ...userWithoutPassword } = newUser.get({ plain: true });

    // Include the token in the response
    res.status(201).json({ ...userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user information
// Update user information
router.put('/self', authenticateToken, async (req, res) => {
  try {
    const authenticatedUser = await User.findByPk(req.user.id);
    if (!authenticatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the request tries to update the username and if it is different from the current one
    if (req.body.username && req.body.username !== authenticatedUser.username) {
      return res.status(400).json({ error: 'Update of username is not allowed' });
    }

    // Update allowed fields only
    if (req.body.first_name) authenticatedUser.first_name = req.body.first_name;
    if (req.body.last_name) authenticatedUser.last_name = req.body.last_name;
    if (req.body.password) authenticatedUser.password = await hashPassword(req.body.password);

    // Save the changes
    await authenticatedUser.save();

    // Omit the password from the result
    const { password, ...updatedUserWithoutPassword } = authenticatedUser.get({ plain: true });

    res.json(updatedUserWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get user information
router.get('/self', authenticateToken, async (req, res) => {
  try {
    // Retrieve the user from the database
    const authenticatedUser = await User.findByPk(req.user.id);
    if (!authenticatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Omit the password from the result
    const { password, ...userWithoutPassword } = authenticatedUser.get({ plain: true });

    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
