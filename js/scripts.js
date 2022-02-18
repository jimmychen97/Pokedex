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
  function add(pokemon){
    pokemonList.push(pokemon);
  }

  // object with key/value pair
  return {
    getAll: getAll,
    add: add
  }
})();

// forEach loop instead of for loop
// arrow function that takes in one parameter, item and prints out the height property of each item
pokemonRepository.getAll().forEach(item => {
  if(item.height >= 1.5) {
    console.log(item.name + " (height: " + item.height + ") - Wow, that's big!");
  } else {
    console.log(item.name + " (height: " + item.height + ")");
  }
});