const CategoryController = require("../controller/category");

class CategoryApi {
  async createCategory(req, res) {
    const { value, description } = req.body;

    try {
      const category = await CategoryController.create(value, description);
      return res.status(201).send(category);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error creating category: ${e.message}` });
    }
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { value, description } = req.body;

    try {
      const category = await CategoryController.update(id, value, description);
      return res.status(200).send(category);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error updating category: ${e.message}` });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      await CategoryController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      if (e.message.includes("associated with existing jokes")) {
        return res.status(409).send({
          error:
            "Cannot delete category because it is associated with existing jokes.",
        });
      }

      return res.status(400).send({
        error: `Error deleting category: ${e.message}`,
      });
    }
  }

  async findCategories(req, res) {
    try {
      const jokes = await CategoryController.find();
      return res.status(200).send(jokes);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing joke categories: ${e.message}` });
    }
  }

  async findCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await CategoryController.findCategory(id);
      return res.status(200).send(category);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error to get category: ${e.message}` });
    }
  }

  async findAll(req, res) {
    try {
      const categories = await CategoryController.find();
      return res.status(200).send(categories);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error to get category: ${e.message}` });
    }
  }
}
module.exports = new CategoryApi();
