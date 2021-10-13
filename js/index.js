import {recipes} from '../../data/recipes.js'
import RecipeEntity from "./entity/Recipe.js";
import RecipeView from "./view/Recipe.js";
import Search from "./component/Search.js";

//not implemented
// let recipesArray = [];
// recipes.forEach(recipe=>{
//     const recipeObj = new RecipeEntity(recipe);
//     recipesArray.push(recipeObj);
// });

const recipe = new RecipeView();
recipe.display();

const search = new Search()
search.watch(recipe)