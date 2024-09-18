const UserController = require("../controller/user")

class UserApi {

    findUser(req, res) {
        try {
            const users = UserController.findAll()

            res.send({ users })
        } catch (e) {
            console.log(e)
            res.status(404).send('deu erro')
        }
    }

    createUser(req, res) {
        try {
            throw new Error("deu ruim aqui :/")
            res.send('post')
        } catch (e) {
            console.log(e)
            res.status(404).send('deu erro')
        }
    }

    updateUser(req, res) {
        try {
            res.send('put')
        } catch (e) {
            console.log(e)
            res.status(404).send('deu erro')
        }
    }

    deleteUser(req, res) {
        try {
            res.send('delete')
        } catch (e) {
            console.log(e)
            res.status(404).send('deu erro')
        }
    }
}

module.exports = new UserApi();