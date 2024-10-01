const CategoryModel = require("../model/category");

const categories = [
  { value: "animal", description: "Related to animals" },
  { value: "career", description: "Related to careers" },
  { value: "celebrity", description: "Related to celebrities" },
  { value: "dev", description: "Related to development" },
  { value: "fashion", description: "Related to fashion" },
  { value: "food", description: "Related to food" },
  { value: "history", description: "Related to history" },
  { value: "money", description: "Related to money" },
  { value: "movie", description: "Related to movies" },
  { value: "music", description: "Related to music" },
  { value: "political", description: "Related to politics" },
  { value: "religion", description: "Related to religion" },
  { value: "science", description: "Related to science" },
  { value: "sport", description: "Related to sports" },
  { value: "travel", description: "Related to travel" },
];

async function insertCategoriesIfNotExist() {
  for (const category of categories) {
    await CategoryModel.findOrCreate({
      where: { value: category.value },
      defaults: { description: category.description },
    });
  }
}

module.exports = {
  insertCategoriesIfNotExist,
};
