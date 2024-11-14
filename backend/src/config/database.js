const { Sequelize } = require("sequelize");
require("dotenv").config();

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      username: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      dialect: process.env.DATABASE_DIALECT,
      logging: false,
    });
  }
}

module.exports = new Database();
