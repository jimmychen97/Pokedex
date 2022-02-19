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

  // object with key/value pair
  return {
    getAll: getAll,
    add: add
  }
})();

// forEach loop instead of for loop
// arrow function that takes in one parameter, item and prints out the height property of each item
pokemonRepository.getAll().forEach(({height, name}) => {
  if(height >= 1.5) {
    console.log(name + " (height: " + height + ") - Wow, that's big!");
  } else {
    console.log(name + " (height: " + height + ")");
  }
});