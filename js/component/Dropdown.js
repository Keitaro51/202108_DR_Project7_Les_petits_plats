import {recipes} from '../../data/recipes.js'

export default class Dropdown{

  show(index){
    const currentDropdown = document.getElementById(`${index}Dropdown`)
    const parent = document.querySelectorAll(`.drop-down.bg-${index}`)[0]
    //this condition avoid changing current elt if multiple focused and clicked again
    if(!parent.classList.contains('expanded')){ 
        currentDropdown.classList.toggle('show')
        //close all other dropdonws excluding current one
        this.close(currentDropdown)
        parent.classList.add("expanded")
    }  
  }

  close(currentDropdown){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    Array.from(dropdowns).forEach(dropdown=>{
      if (dropdown.classList.contains('show') && dropdown != currentDropdown) {
        dropdown.classList.remove('show');
        dropdown.parentElement.classList.remove("expanded");
      }
    })
  }
    //TODO refactor 3 filter functions
  filterIngredients(categoryName){
    let result =[]
    recipes.forEach(recipe=>{
      recipe.ingredients.forEach(elt=>{
        result.push((elt.ingredient).toLowerCase())
      })
    })
    this.filterDisplay(categoryName, new Set(result))
  }

  filterUstensils(categoryName){
    let result =[]
    recipes.forEach(recipe=>{
      recipe.ustensils.forEach(elt=>{
        result.push((elt).toLowerCase())
      })
    })
    this.filterDisplay(categoryName, new Set(result))
  }

  filterAppliance(categoryName){
    let result =[]
    recipes.forEach(recipe=>{
        result.push((recipe.appliance).toLowerCase())
    })
    this.filterDisplay(categoryName, new Set(result))
  }

  filterDisplay(target, datas){
    const listContainer = document.getElementById(`${target}Dropdown`)
    datas.forEach(elt=>{
      listContainer.insertAdjacentHTML(
        'beforeend', `<li class="${target}"">${elt}</li>`
      )
    })
    this.filterListen(listContainer)
  }

  filterListen(listContainer){
    const list = listContainer.getElementsByTagName('li')
    Array.from(list).forEach(elt=>
      elt.addEventListener('click', (e)=>this.tagDisplay(e))
      )
  }

  tagDisplay(e){
    const container = document.getElementsByClassName('selected-filters')[0]
    const category = e.srcElement.classList[0]
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="tag bg-${category}">
          <span>${e.srcElement.outerText}</span>
          <img class="deleteTag" src="./assets/img/cross.svg" alt="">
      </div>`
    )
    this.tagDelete(container)
  }

  tagDelete(container){
    const tagDeleteList = container.getElementsByClassName('deleteTag')
    const tagDeleteBtn = tagDeleteList[tagDeleteList.length - 1]
    tagDeleteBtn.addEventListener('click', (e)=>{
      const targetTag = e.path[1]
      targetTag.parentNode.removeChild(targetTag)
    })
  }

}