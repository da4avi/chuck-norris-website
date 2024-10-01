const JokeController = require("../controller/joke");

class JokeApi {
  async createJoke(req, res) {
    const { category, strJoke } = req.body;

    try {
      const joke = await JokeController.create(category, strJoke);
      return res.status(201).send(joke);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error creating joke: ${e.message}` });
    }
  }

  async updateJoke(req, res) {
    const { id } = req.params;
    const { strJoke, category } = req.body;

    try {
      const joke = await JokeController.update(id, strJoke, category);
      return res.status(200).send(joke);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error updating joke: ${e.message}` });
    }
  }

  async deleteJoke(req, res) {
    try {
      const id = req.params;

      await JokeController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error deleting joke: ${e.message}` });
    }
  }

  async findJokes(req, res) {
    try {
      const jokes = await JokeController.find();
      return res.status(200).send(jokes);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing jokes: ${e.message}` });
    }
  }

  async findJokeById(req, res) {
    const id = req.params;
    try {
      const joke = await JokeController.findJoke(id);
      return res.status(200).send(joke);
    } catch (e) {
      return res.status(400).send({ error: `Error to get joke: ${e.message}` });
    }
  }
}
module.exports = new JokeApi();