const category = require("../model/category");

class CategoryController {
  async create(value, description) {
    if (!value || !description ) {
      throw new Error("Value and description are required");
    }

    try {
      const jokeCategory = await category.create({
        value,
        description,
      });

      return jokeCategory;
    } catch (error) {
      if (error.parent && error.parent.code === "ER_DUP_ENTRY") {
        throw new Error("Category already exists");
      }
      throw new Error(error.message || "Error creating category");
    }
  }

  async findCategory(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const categoryValue = await category.findByPk(id);

    if (!categoryValue) {
      throw new Error("Category not found");
    }

    return categoryValue;
  }

  async update(id, value, description) {
    if (!id || !value || !description) {
      throw new Error("Id, value and description are required");
    }

    const categoryValue = await this.findCategory(id);

    categoryValue.value = value;
    categoryValue.description = description;
    await categoryValue.save();

    return categoryValue;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const categoryValue = await this.findCategory(id);
    await categoryValue.destroy();
  }

  async find() {
    return category.findAll();
  }

}

module.exports = new CategoryController();
