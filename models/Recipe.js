const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

let recipeSchema = new Schema({
    name: String, 
    instructions: [], 
    ingredients: [],
    categories: []
});

module.exports = mongoose.model("Recipe", recipeSchema);