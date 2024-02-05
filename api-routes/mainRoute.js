const express = require('express');
const mainRoute = express.Router();

const healthzRoute = require('./routes/healthz');
const userRoute = require('./routes/user'); // Import the user route

mainRoute.use('/healthz', healthzRoute);
mainRoute.use('/v1/user', userRoute); // Use the user route for the specified path

module.exports = mainRoute;
