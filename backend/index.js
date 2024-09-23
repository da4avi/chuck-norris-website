const express = require("express");
const userRouter = require("./src/routes/user");
const database = require("./src/config/database");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);

database.db
  .sync({ force: false })
  .then(() => {
    app.listen(8000, () => {
      console.log("Server running at port 8000");
    });
  })
  .catch((e) => {
    console.error(`Error: ${e}`);
  });
