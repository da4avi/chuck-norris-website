const express = require("express");
const userRouter = require("./src/routes/user");
const jokeRouter = require("./src/routes/joke");
const database = require("./src/config/database");
const {
  insertCategoriesIfNotExist,
} = require("./src/seeders/InsertCategories");
const { insertAdminIfNotExist } = require("./src/seeders/InsertAdmin");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/joke", jokeRouter);

database.db
  .sync({ force: false })
  .then(() => {
    app.listen(8000, () => {
      console.log("Server running at port 8000");
    });
  })
  .catch((e) => {
    console.error(`Error: ${e}`);
  })
  .finally(() => {
    insertCategoriesIfNotExist();
    insertAdminIfNotExist();
  });
