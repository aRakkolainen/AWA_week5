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

router.get('/recipe/:food', function(req, res) {
  Recipe.find({}, (err, recipes) => {
    if (err) return next(err);
    if (recipes) {
      return res.json(recipes);
    } else {
      return res.status(404).send("Not found");
    }
  })
  /*let recipe = {
    "name": req.params.food,
    "instructions": ["Bake the dough", "Place the toppings", "Bake in the oven"],
    "ingredients": ["flour", "yeast", "water", "cheese", "tomatoes", "ham", "ketchup", "pineapple"]
  }
  res.send(recipe)*/
})
router.post("/recipe/", function(req, res) {

  Recipe.findOne({name: req.body.name, instructions: req.body.instructions, ingredients: req.body.ingredients}, (err, Recipe) => {
    if(err) return next(err);
    if(!name) {
        new Recipe({
          name: req.body.name, 
          instructions: req.body.instructions, 
          ingredients: req.body.ingredients
        }).save((err) => {
          if(err) return next(err); 
          return res.send(req.body);
        })

    } else {
      return res.status(403).send("Already has this recipe!");
    }
  })
})

router.post("/images", function(req, res) {
  res.send("Images received!");
})

module.exports = router;
