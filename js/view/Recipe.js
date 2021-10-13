import {recipes} from '../../data/recipes.js'
import Dropdown from "../component/Dropdown.js";

export default class Recipe{
    /**
     * [recipes cards display]
     *
     * @param   {Array}  recipesId  [exist in case of text search only : list of matching recipes by id]
     *
     * @return  {void}
     */
    display(recipesId,recipesList){
        const recipesContainer = document.getElementById('recipes-list')
        recipesContainer.innerHTML = ''
        recipes.forEach(recipe=>{
            //display all recipes or text search recipes only
            if(recipesId && recipesId.includes(recipe.id) === true || !recipesId){
                recipesContainer.insertAdjacentHTML(
                'beforeend',
                `<div class="card">
                    <figure>
                        <div class="image"></div>
                        <figcaption>
                            <h2>${recipe.name}</h2>
                        <div class="duration">
                            <img src="./assets/img/clock.svg" alt="">
                            <span>${recipe.time} min</span>
                        </div>
                        <ul id="recipe${recipe.id}Ingredients"></ul>
                        <p>${recipe.description}</p>
                        </figcaption>
                    </figure>
                </div>`
                )
                
                const ingredientList = document.getElementById(`recipe${recipe.id}Ingredients`)
                let quantity
                let unit
                let ingredientString
                for(const ingredient of recipe.ingredients){
                    ingredient.quantity === undefined ? quantity = "" : quantity = ingredient.quantity
                    ingredient.unit === undefined ? unit = "" : unit = ingredient.unit
                    ingredient.quantity === undefined ? ingredientString = ingredient.ingredient :  ingredientString = ingredient.ingredient + ' : '
                    ingredientList.insertAdjacentHTML(
                        'beforeend',
                        `<li>${ingredientString} ${quantity}${unit}</li>`
                    )
                }
            //no text search match
            }else if(recipesId.length == 0){
                recipesContainer.innerHTML = '<p>Aucune recette ne correspond à vos critères</p>'
            }
        })
        const filterCategory = ['ingredients', 'ustensils', 'appliance'];
        const dropDown = new Dropdown();
        dropDown.watch(filterCategory, recipesList );
        dropDown.filterIngredients('ingredients',recipesList);
        dropDown.filterUstensils('ustensils',recipesList);
        dropDown.filterAppliance('appliance',recipesList);
        // Close all dropdown if the user clicks outside of it
        window.onclick = function(event) {
            if (event.path.length <= 3 || (!event.path[0].classList.contains('dropbtn') && !event.path[1].classList.contains('dropbtn'))) {
                dropDown.close();
            };
        };
    }
};