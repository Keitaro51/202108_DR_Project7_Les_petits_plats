import {recipes} from '../../data/recipes.js'
import RecipeView from '../view/Recipe.js';

export default class Search{
    /**
     * watch input changes and check validity
     *
     * @return  {void}  
     */
    watch(){
        const textSearch = document.getElementById('text-search');
        const error = document.getElementsByClassName('search-error')[0];
        textSearch.addEventListener('change',()=>{
            if(textSearch.value.length < 3 && textSearch.value.length > 0){
                error.innerText = 'Merci de saisir au moins 3 caractères';
                error.setAttribute('aria-hidden', 'false');
            }else{
                error.innerText = '';
                error.setAttribute('aria-hidden', 'true');
                const {recipesId, recipesList} = this.algo(textSearch.value.toLowerCase());
                //if empty input, reload all recipes and delete remaining tags (consider as new search)
                const tags = document.getElementsByClassName('tag');
                if(tags.length !== 0){
                    tags[0].parentNode.innerHTML = ''
                }
                const recipe = new RecipeView();
                recipe.display(recipesId,recipesList);
            };
        });
    }
    
    /**
     * Find recipes by text search, into title, description or ingredients or using a specific tag
     *
     * @param   {string}  searchString  [text search input]
     * @param   {string}  category  [category of the added tag - default : all (corresponding to "no tag", global search)]
     * @param   {array}  remainingRecipes  [list of recipes to search in - default : no tag, all recipes]
     * @return  {array|array}  recipesId - recipesList  [list of matching recipes ids - list of matching recipes (full datas)]
     */
     algo(searchString, category = 'all', remainingRecipes = recipes){
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
                    subString = recipe.ustensils.join();
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
            let keywordsList = this.stringFormating(subString);
            let result = keywordsList.filter(keyword => keyword.includes(searchString));
            if(result.length > 0){
                recipesId.push(recipe.id);
                recipesList.push(recipe);
            };
        });    
        return {recipesId, recipesList};
    };




    /**
     * [format raw datas for text search (exclude short words, special carac, case sensitivity, etc...)]
     *
     * @param   {string}  rawString  [full recipe text]
     *
     * @return  {array}             [formated full recipe text]
     */
    stringFormating(rawString){
        return rawString.toLowerCase().split(/[,:'.]+/).filter(word => word.length > 2)
    }
}