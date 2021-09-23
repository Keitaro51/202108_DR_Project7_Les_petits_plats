import {recipes} from '../../data/recipes.js';
import Tag from './Tag.js';

export default class Dropdown{

  watch(filterCategory){
    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    const dropdownButtons = document.getElementsByClassName('dropbtn');
    Array.from(dropdownButtons).forEach((dropdownBtn, index)=> {
        dropdownBtn.addEventListener('click', ()=>this.toggle(`${filterCategory[index]}`));
        const input = dropdownBtn.getElementsByTagName('input')[0];
        input.addEventListener('keyup', ()=>{
          this.input(filterCategory[index], input.value)
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
  filterIngredients(categoryName){
    let result =[];
    recipes.forEach(recipe=>{
      recipe.ingredients.forEach(elt=>{
        result.push((elt.ingredient).toLowerCase());
      });
    });
    this.filterDisplay(categoryName, new Set(result));
  };

  filterUstensils(categoryName){
    let result =[];
    recipes.forEach(recipe=>{
      recipe.ustensils.forEach(elt=>{
        result.push((elt).toLowerCase());
      });
    });
    this.filterDisplay(categoryName, new Set(result));
  };

  filterAppliance(categoryName){
    let result =[];
    recipes.forEach(recipe=>{
        result.push((recipe.appliance).toLowerCase());
    });
    this.filterDisplay(categoryName, new Set(result));
  };

  filterDisplay(target, datas){
    const listContainer = document.getElementById(`${target}Dropdown`);
    datas.forEach(elt=>{
      listContainer.insertAdjacentHTML(
        'beforeend', `<li class="${target}"">${elt}</li>`
      );
    });
    this.filterListen(listContainer);
  };

  filterListen(listContainer){
    const list = listContainer.getElementsByTagName('li');
    Array.from(list).forEach(elt=>
      elt.addEventListener('click', (e)=>{
        const tag = new Tag();
        tag.Display(e);
      })
    );
  };

  input(cat, content){
    console.warn('filter upload on input under construct'); 
  };
};