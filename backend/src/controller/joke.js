const joke = require("../model/joke");
const categoryModel = require("../model/category");

class JokeController {
  async create(category, strJoke) {
    if (!category || !strJoke) {
      throw new Error("Category, strJoke are required");
    }

    const categoryValue = await categoryModel.findOne({
      where: { value: category },
    });

    if (!categoryValue) {
      throw new Error("Category not found");
    }
    try {
      const userJoke = await joke.create({
        value,
        category,
        userId: req.user.id,
      });

      return userJoke;
    } catch (error) {
      if (error.parent && error.parent.code === "ER_DUP_ENTRY") {
        throw new Error("Joke already exists");
      }
      throw new Error(error.message || "Error creating joke");
    }
  }

  async findJoke(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const jokeValue = await joke.findByPk(id);

    if (!jokeValue) {
      throw new Error("Joke not found");
    }

    return jokeValue;
  }

  async update(id, category, strJoke) {
    if (!id || !category || !strJoke) {
      throw new Error("Id, category and strJoke are required");
    }

    const jokeValue = await this.findJoke(id);

    jokeValue.category = category;
    jokeValue.strJoke = strJoke;
    await jokeValue.save();

    return jokeValue;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const jokeValue = await this.findJoke(id);
    await jokeValue.destroy();
  }

  async find() {
    return joke.findAll();
  }
}

module.exports = new JokeController();
