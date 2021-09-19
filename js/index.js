import Recipe from "./entity/Recipe.js"
import Dropdown from "./component/Dropdown.js"
const recipe = new Recipe()
const dropDown = new Dropdown()
const filterCategory = ['ingredients', 'ustensils', 'appliance']

//filterCategory.forEach(categoryName=>dropDown.filter(categoryName))
dropDown.filterIngredients('ingredients')
dropDown.filterUstensils('ustensils')
dropDown.filterAppliance('appliance')
recipe.display()

const textSearch = document.getElementById('text-search')
textSearch.addEventListener('change',()=>{
    const error = document.getElementsByClassName('search-error')[0]
    if(textSearch.value.length <3){
        error.innerText = 'Merci de saisir au moins 3 caractères'
        error.setAttribute('aria-hidden', 'false')
    }else{
        error.innerText = ''
        error.setAttribute('aria-hidden', 'true')
        const filteredRecipes = recipe.searchRecipe(textSearch.value)
        recipe.display(filteredRecipes)
    }
})

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
const dropdownButtons = document.getElementsByClassName('dropbtn')
Array.from(dropdownButtons).forEach((dropdownBtn, index)=> {
    dropdownBtn.addEventListener('click', ()=>dropDown.show(`${filterCategory[index]}`))
})

// Close all dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (event.path.length <= 3 || (!event.path[0].classList.contains('dropbtn') && !event.path[1].classList.contains('dropbtn'))) {
        dropDown.close()
    }
}