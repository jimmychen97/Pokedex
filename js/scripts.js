// an object of pokemons
let pokemonList = [
  { name: "Bulbasaur", height: 0.7, type: ["Grass", "Poison"] },
  { name: "Ivysaur", height: 1, type: ["Grass", "Poison"] },
  { name: "Venusaur", height: 2, type: ["Grass", "Poison"] }
];

// displaying names and heights of each pokemon in the pokemonList
// conditional if-else to check if a pokemon's height is above 1.5
for(let i = 0; i< pokemonList.length; i++){
  
  if(pokemonList[i].height >= 1.5) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
  } else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  }
  document.write("<br>");
}



