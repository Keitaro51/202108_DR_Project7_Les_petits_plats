export default class Tag{

    Display(e){
        const container = document.getElementsByClassName('selected-filters')[0]
        const category = e.srcElement.classList[0]
        container.insertAdjacentHTML(
          'beforeend',
          `<div class="tag bg-${category}">
              <span>${e.srcElement.outerText}</span>
              <img class="deleteTag" src="./assets/img/cross.svg" alt="">
          </div>`
        )
        this.Delete(container)
      }
    
      Delete(container){
        const tagDeleteList = container.getElementsByClassName('deleteTag')
        const tagDeleteBtn = tagDeleteList[tagDeleteList.length - 1]
        tagDeleteBtn.addEventListener('click', (e)=>{
          const targetTag = e.path[1]
          targetTag.parentNode.removeChild(targetTag)
        })
      }
}