const database = require("../config/database");

class CategoryModel {
  constructor() {
    this.model = database.db.define("categories", {
      id: {
        type: database.db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  }
}

module.exports = new CategoryModel().model;
