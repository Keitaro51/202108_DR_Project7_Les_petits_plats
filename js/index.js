import {recipes} from '../../data/recipes.js'
import RecipeEntity from "./entity/Recipe.js";
import RecipeView from "./view/Recipe.js";

let recipesArray = [];
recipes.forEach(recipe=>{
    const recipeObj = new RecipeEntity(recipe);
    recipesArray.push(recipeObj);
});

const recipe = new RecipeView();
recipe.display();

//ready for POO
//import Search from "./component/Search.js";
//const search = new Search()
// search.watch(recipe)
const textSearch = document.getElementById('text-search');
const error = document.getElementsByClassName('search-error')[0];
textSearch.addEventListener('change',()=>{
    if(textSearch.value.length < 3 && textSearch.value.length > 0){
        error.innerText = 'Merci de saisir au moins 3 caractères';
        error.setAttribute('aria-hidden', 'false');
    }else{
        error.innerText = '';
        error.setAttribute('aria-hidden', 'true');
        const {recipesId, recipesList} = recipe.search(textSearch.value.toLowerCase());
        //if empty input, reload all recipes and delete remaining tags (consider as new search)
        const tags = document.getElementsByClassName('tag');
        if(tags.length !== 0){
            tags[0].parentNode.innerHTML = ''
        }
        recipe.display(recipesId,recipesList);
    };
});