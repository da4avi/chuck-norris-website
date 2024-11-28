const { Sequelize } = require("sequelize");
require("dotenv").config();

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      dialect: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      dialect: "postgres",
      password: process.env.DATABASE_PASSWORD,
      // dialectOptions: {
      //   ssl: {
      //     require: true,
      //     rejectUnauthorized: false,
      //   },
      // },
    });
  }
}

module.exports = new Database();
