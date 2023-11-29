/*Sources: 
How to use findOne: https://mongoosejs.com/docs/api/model.html#Model.findOne() 
Using mongoose: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const Category = require("../models/Category");
let recipes = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Week4' });
});
// Fetching special diets from database
router.get('/categories', async function(req, res) {
    let categories = []; 
    try {

      let data = await Category.find({})
      data.forEach(diet => {
        categories.push(diet.name)
      })
      res.send({"categories": categories})
    } catch(error) {
      console.log("Failed to fetch categories:", error);
    }
});
//Searching recipe
router.get('/recipe/:food', async function(req, res) {
  let temp = req.params.food; 
  let recipeName = temp.charAt(0).toUpperCase() + temp.slice(1);
  try {

  
  let recipe = await Recipe.findOne({name: recipeName}).exec();
  if (!recipe) {
    res.send({"data": "Recipe not found!"})
  } else {
    res.send({"data": recipe});
  }
} catch(error) {
    console.log("Can't find the recipe:", error);
}
})
// Adding new recipe to the database
router.post("/recipe/", async (req, res, next) => {
  let name = await Recipe.findOne({name: req.body.name}).exec(); 
  let tempName = req.body.name;
  if (!name) {
    const recipe = new Recipe({name: tempName.charAt(0).toUpperCase() + tempName.slice(1), instructions: req.body.instructions, ingredients: req.body.ingredients})
    await recipe.save(); 
    res.send(req.body)
  } else {
    return res.status(403).send("Already has this recipe");
  }
})
  
router.post("/images", function(req, res) {
  res.send("Images received!");
})

module.exports = router;
