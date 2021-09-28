import {recipes} from '../../data/recipes.js'
import RecipeView from '../view/Recipe.js'

export default class Tag{
  /**
   * display selected filter as tag, depending to category
   *
   * @param   {Event}  listElt  [click event with elements info]
   * @param   {Array}  recipesList  [list of remaining recipes]
   * 
   * @return  {void}           
   */
  display(listElt, recipesList){
    const tagContainer = document.getElementsByClassName('selected-filters')[0];
    const tagCategory = listElt.target.classList[0];
    const tagContent = listElt.target.outerText
    tagContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="tag ${tagCategory} bg-${tagCategory}">
          <span>${tagContent}</span>
          <img class="deleteTag" src="./assets/img/cross.svg" alt="">
      </div>`
    );
    this.delete(tagContainer);
    this.update(tagContent, tagCategory, recipesList, 'add');
  };
   
  /**
   * initialize delete btn on most recent added tag and delete it on click
   *
   * @param   {HTMLElement}  tag container  [DOM node as context for tag creation]
   *
   * @return  {void}             
   */
  delete(tagContainer){
    const tagDeleteList = tagContainer.getElementsByClassName('deleteTag');
    //target the most recently added tag (last of the HTML Collection)
    const tagDeleteBtn = tagDeleteList[tagDeleteList.length - 1];
    tagDeleteBtn.addEventListener('click', (e)=>{
      const targetTag = e.path[1];
      targetTag.parentNode.removeChild(targetTag);
      this.update(undefined,undefined,undefined, 'remove');
    });
  };

   /**
   * update search with added tag
   *
   * @param   {[type]}  tagContent        [tagContent description]
   * @param   {[type]}  category          [category description]
   * @param   {[type]}  remainingRecipes  [remainingRecipes description]
   * @param   {String}  state  [add or remove]
   *
   * @return  {[type]}                    [return description]
   */
  update(tagContent, category, remainingRecipes, state){
    if(state === 'add'){
      const recipeView = new RecipeView();
      const {recipesId, recipesList} = recipeView.search(tagContent, category, remainingRecipes);
      recipeView.display(recipesId,recipesList);
    }else if (state ==='remove') {
      const input = document.getElementById('text-search');
      const recipeView = new RecipeView();
      //proceed to a new search, starting with input content and then a new sub-search for each tag
      let newList = recipeView.search(input.value);
      recipeView.display(newList.recipesId, newList.recipesList);
      const tags = document.getElementsByClassName('tag');
      //recursive loop where each tag use the remaining recipe list from previous tag
      Array.from(tags).forEach(tag=> {        
        const tempList = recipeView.search(tag.firstElementChild.textContent, tag.classList[1], newList.recipesList);
        recipeView.display(tempList.recipesId, tempList.recipesList);
        newList = tempList.recipesList;
      });
    };
  };
};