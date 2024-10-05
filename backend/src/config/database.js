const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.db = new Sequelize({
      database: "chuck-norris-website",
      host: "localhost",
      username: "root",
      dialect: "mysql",
    });
  }
}

module.exports = new Database()