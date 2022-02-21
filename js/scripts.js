// an object of pokemons wrapped in IIFE
let pokemonRepository = (function (){
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ["Grass", "Poison"] },
    { name: "Ivysaur", height: 1, type: ["Grass", "Poison"] },
    { name: "Venusaur", height: 2, type: ["Grass", "Poison"] }
  ];

  // return all items
  function getAll(){
    return pokemonList;
  }

  // add a single item to pokemonList
  // a conditional check if input is an object
  function add(pokemon){
    if(typeof pokemon === 'object'){
      pokemonList.push(pokemon);
    } else {
      return 'Input type is not valid. Only accpet objects';
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    // click event to show console.log(pokemon)
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon){
    console.log(pokemon.name);
  }

  // object with key/value pair
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }
})();

// forEach loop instead of for loop
// arrow function that takes in one parameter, item and prints out the height property of each item
pokemonRepository.getAll().forEach(pokemon => {
  pokemonRepository.addListItem(pokemon);
});