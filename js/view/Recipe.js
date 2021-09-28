import {recipes} from '../../data/recipes.js'
import Dropdown from "../component/Dropdown.js";
import Search from "../component/Search.js"

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

    /**
     * Find recipes by text search, into title, description or ingredients or using a specific tag
     *
     * @param   {string}  searchString  [text search input]
     * @param   {string}  category  [category of the added tag - default : all (corresponding to "no tag", global search)]
     * @param   {array}  remainingRecipes  [list of recipes to search in - default : no tag, all recipes]
     * @return  {array|array}  recipesId - recipesList  [list of matching recipes ids - list of matching recipes (full datas)]
     */
     search(searchString, category = 'all', remainingRecipes = recipes){
        let recipesId = [];
        let recipesList= [];
        remainingRecipes.forEach(recipe=>{
            let subString ='';
            //specific categrory (if user add a tag)  or no category (search in all recipes datas, loading/refresh page)
            switch(category){
                case 'ingredients':
                    recipe.ingredients.forEach(ingredient=>{
                        subString = subString.concat(' ', ingredient.ingredient);
                    });
                    break;
                case 'ustensils':
                    subString = subString.concat(' ', recipe.ustensils);
                    break;
                case 'appliance':
                    subString = recipe.appliance;
                    break;
                case 'all':
                    subString = recipe.name.concat(' ', recipe.description);
                    recipe.ingredients.forEach(ingredient=>{
                        subString = subString.concat(' ', ingredient.ingredient);
                    });
                    break;
            }
            //comparison between searchString (input or tag) and keyword list in datas
            const search = new Search();
            let keywordsList = search.stringFormating(subString);
            let result = keywordsList.filter(keyword => keyword.includes(searchString));
            if(result.length > 0){
                recipesId.push(recipe.id);
                recipesList.push(recipe);
            };
        });    
        return {recipesId, recipesList};
    };
};