const usersMock = new Array({
    email: "davi@davi",
    password: "davi"
})

class UserModel {

    findAll() {
        return usersMock
    }

}

module.exports = new UserModel()