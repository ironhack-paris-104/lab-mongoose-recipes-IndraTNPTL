const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");

// Import of the recipes from './data.json'
const recipes = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// CONNECTION to the database "recipe-app"
mongoose
	.connect(MONGODB_URI)
	.then((x) => {
		console.log(`Connected to the database: "${x.connection.name}"`);
		// Before adding any recipes to the database, let's remove all existing ones
		return Recipe.deleteMany();
	})
	.then(async (db) => {
		// For example, insert a new recipe or multiple recipes using Recipe.create() or Recipe.insertMany()

		try {
			// ITERATION 2 - using Recipe.create()

			// const createdRecipes = await Recipe.create(recipes);
			// for (let oneRecipe of recipes) {
			// 	console.log(`${oneRecipe.title}`);
			// }

			// ITERATION 3 - using Recipe.insertMany()

			const insertedRecipes = await Recipe.insertMany(recipes);
			// console.log(insertedRecipes);
			for (let oneRecipe of recipes) {
				console.log(`${oneRecipe.title}`);
			}

			// ITERATION 4 - Update recipe using Recipe.findOneAndUpdate()

			const updatedRecipe = await Recipe.findOneAndUpdate(
				{ title: "Rigatoni alla Genovese" },
				{ duration: 100 },
				{ new: true }
			);
			console.log(updatedRecipe);
			console.log("The Rigatoni alla Genovese is now right on time!");

			// ITERATION 5 - Remove recipe using Recipe.deleteOne()

			const deletedRecipe = await Recipe.deleteOne({
				title: "Carrot Cake",
			});
			console.log("Carrot cake is not available anymore, sorry!");

			// CATCH ERROR
		} catch (error) {
			console.error("Error connecting to the database", error);
		} finally {
			// Make sure to wait for all the operations to complete before disconnecting
			mongoose.disconnect().then(() => {
				console.log("Disconnected from the database");
			});
		}
	});
