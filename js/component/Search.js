// export default class Search{
//     watch(){
//         const textSearch = document.getElementById('text-search');
//         textSearch.addEventListener('change',()=>{
//         const error = document.getElementsByClassName('search-error')[0];
//             if(textSearch.value.length <3){
//                 error.innerText = 'Merci de saisir au moins 3 caractères';
//                 error.setAttribute('aria-hidden', 'false');
//             }else{
//                 error.innerText = '';
//                 error.setAttribute('aria-hidden', 'true');
//                 const filteredRecipes = recipe.search(textSearch.value);
//                 recipe.display(filteredRecipes);
//                 //TODO recipe is not defined
//             }
//         })
//     }
// }