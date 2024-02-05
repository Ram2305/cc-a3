// userModel.js
const Sequelize = require('sequelize');
const { sequelize } = require('./mysql-db-connect');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  first_name: {
    type: Sequelize.STRING,
  },
  last_name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hashedPassword);
    },
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  // account_created: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW,
  // },
  // account_updated: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW,
  // },
});

module.exports = User;
