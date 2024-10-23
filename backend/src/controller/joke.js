const joke = require("../model/joke");
const categoryModel = require("../model/category");

class JokeController {
  async create(value, category, userId) {
    if (!category || !value) {
      throw new Error("Category, value are required");
    }

    const categoryValue = await categoryModel.findOne({
      where: { value: category },
    });

    if (!categoryValue) {
      throw new Error("This category doesn't exists.");
    }

    try {
      const userJoke = await joke.create({
        value,
        categoryId: categoryValue.id,
        userId,
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

  async update(id, category, strValue) {
    if (!id || !category || !strValue) {
      throw new Error("Id, category and strValue are required");
    }

    const jokeValue = await this.findJoke(id);

    jokeValue.category = category;
    jokeValue.value = strValue;
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

  async findRandomJoke() {
    const jokes = await this.find();
    const jokesCount = jokes.length;

    if (jokesCount === 0) {
      throw new Error("No jokes available");
    }

    const randomIndex = Math.floor(Math.random() * jokesCount);
    const jokeValue = jokes[randomIndex];

    return jokeValue;
  }

  async findRandomJokeByCategory(category) {
    const jokes = await this.find();
    const filteredJokes = jokes.filter(joke => joke.category === category);
    const jokesCount = filteredJokes.length;

    if (jokesCount === 0) {
      throw new Error("No jokes available for this category");
    }

    const randomIndex = Math.floor(Math.random() * jokesCount);
    const jokeValue = filteredJokes[randomIndex];

    return jokeValue;
  }


}

module.exports = new JokeController();
