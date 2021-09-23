import {recipes} from '../../data/recipes.js'
import RecipeEntity from "./entity/Recipe.js";
import RecipeView from "./view/Recipe.js";
import Dropdown from "./component/Dropdown.js";

const filterCategory = ['ingredients', 'ustensils', 'appliance'];

const dropDown = new Dropdown();
dropDown.watch(filterCategory);
dropDown.filterIngredients('ingredients');
dropDown.filterUstensils('ustensils');
dropDown.filterAppliance('appliance');
//filterCategory.forEach(categoryName=>dropDown.filter(categoryName))

let recipesArray = [];
recipes.forEach(recipe=>{
    const recipeObj = new RecipeEntity(recipe);
    recipesArray.push(recipeObj);
});

const recipe = new RecipeView();
recipe.display();

//ready for POO
//import Search from "./component/Search.js";
// const search = new Search()
// search.watch()
const textSearch = document.getElementById('text-search');
textSearch.addEventListener('change',()=>{
    const error = document.getElementsByClassName('search-error')[0];
    if(textSearch.value.length <3){
        error.innerText = 'Merci de saisir au moins 3 caractères';
        error.setAttribute('aria-hidden', 'false');
    }else{
        error.innerText = '';
        error.setAttribute('aria-hidden', 'true');
        const filteredRecipes = recipe.search(textSearch.value);
        recipe.display(filteredRecipes);
    };
});

// Close all dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (event.path.length <= 3 || (!event.path[0].classList.contains('dropbtn') && !event.path[1].classList.contains('dropbtn'))) {
        dropDown.close();
    };
};