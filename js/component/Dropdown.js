import {recipes} from '../../data/recipes.js';
import Tag from './Tag.js';

export default class Dropdown{

  watch(filterCategory, recipesList){
    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    const dropdownButtons = document.getElementsByClassName('dropbtn');
    Array.from(dropdownButtons).forEach((dropdownBtn, index)=> {
        dropdownBtn.addEventListener('click', ()=>this.toggle(`${filterCategory[index]}`));
        const input = dropdownBtn.getElementsByTagName('input')[0];
        input.addEventListener('keyup', ()=>{
          switch (filterCategory[index]){
            case 'ingredients' : 
              this.filterIngredients(filterCategory[index],recipesList, input.value.toLowerCase());
              break;
            case 'ustensils' : 
              this.filterUstensils(filterCategory[index],recipesList, input.value.toLowerCase());
              break;
            case 'appliance' : 
              this.filterAppliance(filterCategory[index],recipesList, input.value.toLowerCase());
              break;
          };
        })
    });
  };
  
  toggle(index){
    const currentDropdown = document.getElementById(`${index}Dropdown`);
    const parent = document.querySelectorAll(`.drop-down.bg-${index}`)[0];
    //this condition avoid changing current elt if multiple focused and clicked again
    if(!parent.classList.contains('expanded')){ 
        currentDropdown.classList.toggle('show');
        //close all other dropdonws excluding current one
        this.close(currentDropdown);
        parent.classList.add("expanded");
    };
  };

  close(currentDropdown){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    Array.from(dropdowns).forEach(dropdown=>{
      if (dropdown.classList.contains('show') && dropdown != currentDropdown) {
        dropdown.classList.remove('show');
        dropdown.parentElement.classList.remove("expanded");
      };
    });
  };

  //TODO refactor 3 filter functions
  filterIngredients(categoryName, recipesList, input){
    let result =[];
    if(!recipesList){recipesList=recipes};
    recipesList.forEach(recipe=>{
      recipe.ingredients.forEach(elt=>{
        if(!input || (elt.ingredient).toLowerCase().includes(input)){
          result.push((elt.ingredient).toLowerCase());
        }
      });
    });
    this.filterDisplay(categoryName, new Set(result), recipesList);
  };

  filterUstensils(categoryName, recipesList, input){
    let result =[];
    if(!recipesList){recipesList=recipes};
    recipesList.forEach(recipe=>{
      recipe.ustensils.forEach(elt=>{
        if(!input || elt.toLowerCase().includes(input)){
          result.push(elt.toLowerCase());
        }
      });
    });
    this.filterDisplay(categoryName, new Set(result), recipesList);
  };

  filterAppliance(categoryName, recipesList, input){
    let result =[];
    if(!recipesList){recipesList=recipes};
    recipesList.forEach(recipe=>{
      if(!input || recipe.appliance.toLowerCase().includes(input)){
        result.push((recipe.appliance).toLowerCase());
      }
    });
    this.filterDisplay(categoryName, new Set(result), recipesList);
  };

  filterDisplay(DOMtarget, liItems, recipesList){
    const listContainer = document.getElementById(`${DOMtarget}Dropdown`);
    listContainer.innerHTML=''
    liItems.forEach(liItem=>{
      listContainer.insertAdjacentHTML(
        'beforeend', `<li class="${DOMtarget}">${liItem}</li>`
      );
    });
    this.filterListen(listContainer, recipesList);
  };

  filterListen(listContainer, recipesList){
    const list = listContainer.getElementsByTagName('li');
    Array.from(list).forEach(elt=>
      elt.addEventListener('click', (e)=>{
        const tag = new Tag();
        tag.display(e, recipesList);
      })
    );
  };
};