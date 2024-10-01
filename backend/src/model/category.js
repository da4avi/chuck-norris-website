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
        type: database.db.Sequelize.ENUM(
          "animal",
          "career",
          "celebrity",
          "dev",
          "fashion",
          "food",
          "history",
          "money",
          "movie",
          "music",
          "political",
          "religion",
          "science",
          "sport",
          "travel"
        ),
        allowNull: false,
      },
      description: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
      },
    });
  }
}

module.exports = new CategoryModel().model;
