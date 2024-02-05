require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const checkPayload = require("./middleware/checkPayload");
// const checkQueryParams = require("./middleware/checkQueryParams");
const mainRoute = require('./api-routes/mainRoute');
const { initializeDatabase } = require('./models/mysql-db-connect');

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Custom middlewares
// app.use(checkPayload);
// app.use(checkQueryParams);

// Main route
app.use('/', mainRoute);

const PORT = process.env.PORT || 3307;

// Initialize the database
initializeDatabase().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Error initializing database:', error);
});
