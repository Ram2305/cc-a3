// mysql-db-connect.js
const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync(); // This will create tables if they do not exist
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

module.exports = {
  sequelize,
  initializeDatabase,
};
