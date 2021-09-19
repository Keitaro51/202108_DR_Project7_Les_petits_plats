import {recipes} from '../../data/recipes.js'

export default class Recipe{

    display(recipesId){
        const recipesContainer = document.getElementById('recipes-list')
        recipesContainer.innerHTML = ''
        recipes.forEach(elt=>{
                recipesContainer.insertAdjacentHTML(
                'beforeend',
                `<div class="card">
                    <figure>
                        <div class="image"></div>
                        <figcaption>
                            <h2>${elt.name}</h2>
                        <div class="duration">
                            <img src="./assets/img/clock.svg" alt="">
                            <span>${elt.time} min</span>
                        </div>
                        <ul id="recipe${elt.id}Ingredients"></ul>
                        <p>${elt.description}</p>
                        </figcaption>
                    </figure>
                </div>`
                )
                
                const ingredientList = document.getElementById(`recipe${elt.id}Ingredients`)
                let quantity
                let unit
                let ingredientString
                for(const ingredient of elt.ingredients){
                    
                    ingredient.quantity === undefined ? quantity = "" : quantity = ingredient.quantity
                    ingredient.unit === undefined ? unit = "" : unit = ingredient.unit
                    ingredient.quantity === undefined ? ingredientString = ingredient.ingredient :  ingredientString = ingredient.ingredient + ' : '
                    ingredientList.insertAdjacentHTML(
                        'beforeend',
                        `<li>${ingredientString} ${quantity}${unit}</li>`
                    )
                }
        })
    }
    searchRecipe(searchString){

    }
}