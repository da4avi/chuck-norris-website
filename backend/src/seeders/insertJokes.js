const jokesModel = require("../model/joke");
const userModel = require("../model/user");
const categoryModel = require("../model/category");

const categories = [
    "animal",
    "career",
    "celebrity",
    "dev",
    "fashion",
    "food",
    "history",
    "money",
    "movie",
    "music",
    "science",
    "sport",
    "travel",
];

async function insertJokesIfNotExist() {
    const existsJoke = await jokesModel.findAll();

    if (existsJoke.length === 0) {
        for (let j = 0; j < categories.length; j++) {
            try {
                const response = await fetch(
                    `https://api.chucknorris.io/jokes/random?category=${categories[j]}`
                );

                if (!response.ok) {
                    console.log("Error to get a joke by category.");
                    return;
                }

                const joke = await response.json();
                const userAdmin = await userModel.findOne({ where: { id: 1 } });

                const categoryValue = await categoryModel.findOne({
                    where: { value: categories[j] },
                });

                await jokesModel.create({
                    value: joke.value,
                    categoryId: categoryValue.id,
                    icon_url: joke.icon_url,
                    userId: userAdmin.id,
                });

                console.log(`Inserted joke for category: ${categories[j]}`);
            } catch (err) {
                console.error(`Error to populate database with jokes: ${err.message}`);
            }
        }
    } else {
        console.log("Jokes already exist in database");
    }
}

module.exports = {
    insertJokesIfNotExist,
};