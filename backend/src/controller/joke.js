const joke = require("../model/joke");
const categoryModel = require("../model/category");

class JokeController {
  async create(value, category, userId) {
    if (!category || !value) {
      throw new Error("Category and value are required");
    }

    const categoryValue = await categoryModel.findOne({
      where: { value: category },
    });

    if (!categoryValue) {
      throw new Error("This category doesn't exist.");
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

    const categoryValue = await categoryModel.findOne({
      where: { value: category },
    });

    if (!categoryValue) {
      throw new Error("This category doesn't exist.");
    }

    jokeValue.categoryId = categoryValue.id;
    jokeValue.value = strValue;
    await jokeValue.save();

    return jokeValue;
  }

  async deleteCategory(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const category = await categoryModel.findByPk(id);
    if (!category) {
      throw new Error("Category not found");
    }

    await category.destroy();
  }

  async find(userId, userToken) {
    try {
      const jokes = await joke.findAll(userId ? { where: { userId } } : {});

      const jokesWithCategories = await Promise.all(
        jokes.map(async (joke) => {
          try {
            const response = await fetch(
              `http://localhost:8000/api/v1/category/${joke.categoryId}`,
              {
                headers: {
                  Authorization: userToken,
                },
              }
            );
            const categoryData = await response.json();
            return { ...joke.toJSON(), category: categoryData.value };
          } catch (fetchErr) {
            console.error(
              `Failed to fetch category for joke ${joke.id}:`,
              fetchErr
            );
            return { ...joke.toJSON(), category: null };
          }
        })
      );

      return jokesWithCategories;
    } catch (err) {
      console.error("Error fetching jokes:", err);
      return [];
    }
  }

  async findRandomJoke() {
    const jokes = await this.find();
    const jokesCount = jokes.length;

    if (jokesCount === 0) {
      throw new Error("No jokes available");
    }

    const randomIndex = Math.floor(Math.random() * jokesCount);
    return jokes[randomIndex];
  }

  async findRandomJokeByCategory(category) {
    try {
      const categoryValue = await categoryModel.findOne({
        where: { value: category },
      });

      if (!categoryValue) {
        throw new Error("No jokes available for this category");
      }

      const jokes = await this.find();

      const filteredJokes = jokes.filter(
        (joke) => joke.categoryId === categoryValue.id
      );

      const jokesCount = filteredJokes.length;
      if (jokesCount === 0) {
        throw new Error("No jokes available for this category");
      }

      const randomIndex = Math.floor(Math.random() * jokesCount);
      return filteredJokes[randomIndex];
    } catch (error) {
      throw new Error(`Error retrieving joke: ${error.message}`);
    }
  }
}

module.exports = new JokeController();
