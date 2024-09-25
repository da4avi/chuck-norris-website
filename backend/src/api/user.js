const UserController = require("../controller/user");

class UserApi {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    const role = "viewer";
    try {
      const user = await UserController.create(name, email, password, role);
      return res.status(201).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error creating user: ${e.message}` });
    }
  }
  async createAdmin(req, res) {
    const { name, email, password } = req.body;
    const role = "admin";
    try {
      const user = await UserController.create(name, email, password, role);
      return res.status(201).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error creating user: ${e.message}` });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const user = await UserController.update(
        Number(id),
        name,
        email,
        password
      );
      return res.status(200).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error updating user: ${e.message}` });
    }
  }

  async deleteUser(req, res) {

    try {
      const id = req.params.id || req.user.id

      await UserController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error deleting user: ${e.message}` });
    }
  }

  async findUsers(req, res) {
    try {
      const users = await UserController.find();
      return res.status(200).send(users);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing users: ${e.message}` });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const token = await UserController.login(email, password);
      return res.status(200).send({ token });
    } catch (e) {
      return res.status(400).send({ error: `Error logging: ${e.message}` });
    }
  }
}

module.exports = new UserApi();
