const database = require("../config/database");

class JokeModel {
  constructor() {
    this.model = database.db.define("jokes", {
      id: {
        type: database.db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: database.db.Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      icon_url: {
        type: database.db.Sequelize.STRING,
        allowNull: true,
      },
      categoryId: {
        type: database.db.Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      userId: {
        type: database.db.Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    });
  }
}

module.exports = new JokeModel().model;
