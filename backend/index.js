const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routes/user");
const jokeRouter = require("./src/routes/joke");
const categoryRouter = require("./src/routes/category");
const database = require("./src/config/database");
const {
  insertCategoriesIfNotExist,
} = require("./src/seeders/InsertCategories");
const { insertAdminIfNotExist } = require("./src/seeders/InsertAdmin");
const { insertJokesIfNotExist } = require("./src/seeders/insertJokes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/joke", jokeRouter);
app.use("/api/v1/category", categoryRouter);

database.db
  .sync({ force: false })
  .then(async () => {
    app.listen(8000, () => {
      console.log("Server running at port 8000");
    });

    await insertAdminIfNotExist();
    await insertCategoriesIfNotExist();
    await insertJokesIfNotExist();
  })
  .catch((e) => {
    console.error(`Error: ${e}`);
  });
