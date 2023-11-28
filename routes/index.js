/*Sources: 
How to use findOne: https://mongoosejs.com/docs/api/model.html#Model.findOne() 
Using mongoose: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
*/

var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe")
let recipes = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Week4' });
});
//Task 1
/*router.get('/recipe/:food', function(req, res) {
  //let recipeName = req.params.food; 
  let recipe = req.body;
  //How to send and render at same time: https://expressjs.com/en/guide/using-middleware.html
  //res.render('recipe', {title: req.body.name, ingredients: recipe.ingredients, instructions: recipe.instructions});
  //res.render('recipe', {title: req.body.name, ingredients: recipe.ingredients, instructions: recipe.instructions})
  res.send(recipe)
})*/

router.get('/recipe/:food', async function(req, res) {
  let recipeName = req.params.food; 
  let recipe = await Recipe.findOne({name: recipeName}).exec();
  if (!recipe) {
    res.send({"data": "Recipe not found!"})
  } else {
    res.send({"data": recipe});
  }
  /*Recipe.find({}, (err, recipes) => {
    if (err) return next(err);
    if (recipes) {
      return res.json(recipes);
    } else {
      return res.status(404).send("Not found");
    }
  })*/
  /*let recipe = {
    "name": req.params.food,
    "instructions": ["Bake the dough", "Place the toppings", "Bake in the oven"],
    "ingredients": ["flour", "yeast", "water", "cheese", "tomatoes", "ham", "ketchup", "pineapple"]
  }*/
  //res.send(recipe)
})

router.post("/recipe/", async (req, res, next) => {
  let name = await Recipe.findOne({name: req.body.name}).exec(); 
  if (!name) {
    const recipe = new Recipe({name: req.body.name, instructions: req.body.instructions, ingredients: req.body.ingredients})
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
