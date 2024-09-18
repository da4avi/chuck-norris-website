const express = require ('express');
const userRouter = require('./src/routes/user');

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter)

app.listen(3000, () =>{
    console.log('servido rodando na porta 3000');
}) 