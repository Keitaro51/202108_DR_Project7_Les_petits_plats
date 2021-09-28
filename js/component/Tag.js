import RecipeView from '../view/Recipe.js'

export default class Tag{
  /**
   * display selected filter as tag, depending to category
   *
   * @param   {Event}  listElt  [click event with elements info]
   *
   * @return  {void}           
   */
  Display(listElt, recipesList){
    const tagContainer = document.getElementsByClassName('selected-filters')[0];
    const tagCategory = listElt.target.classList[0];
    const tagContent = listElt.target.outerText
    tagContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="tag bg-${tagCategory}">
          <span>${tagContent}</span>
          <img class="deleteTag" src="./assets/img/cross.svg" alt="">
      </div>`
    );
    this.Delete(tagContainer);
    this.Update(tagContent, tagCategory, recipesList);
  };
   
  /**
   * delete selected tag from view
   *
   * @param   {HTMLElement}  tag container  [DOM node as context for tag creation]
   *
   * @return  {void}             
   */
  Delete(container){
    const tagDeleteList = container.getElementsByClassName('deleteTag');
    const tagDeleteBtn = tagDeleteList[tagDeleteList.length - 1];
    tagDeleteBtn.addEventListener('click', (e)=>{
      const targetTag = e.path[1];
      targetTag.parentNode.removeChild(targetTag);
      //this.Update();
    });
  };

  /**
   * update search with added tag
   *
   * @return  {void}
   */
  Update(tagContent, category, remainingRecipes){
    const recipeView = new RecipeView();
    const {recipesId, recipesList} = recipeView.search(tagContent, category, remainingRecipes);
    recipeView.display(recipesId,recipesList);
    //TODO suppression d'un tag
    //const tags = document.getElementsByClassName('tag');
    //Array.from(tags).forEach(tag=>console.log(tag.firstElementChild.textContent));
    //voir cas supression du dernier tag, donc HTMLCollection vide
  };
};