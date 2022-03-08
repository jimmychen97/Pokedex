// an object of pokemons wrapped in IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // return all items
  function getAll() {
    return pokemonList;
  }

  // add a single item to pokemonList
  // a conditional check if input is an object
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } else {
      return "Input type is not valid. Only accpet objects";
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = capitalize(pokemon.name);
    button.classList.add("btn", "btn-outline-dark", "pokemon-button");

    // modal linking
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    listItem.appendChild(button);
    listItem.classList.add("list-group-item");
    pokemonList.appendChild(listItem);

    // click event to show modal
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function loadList() {
    // showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        // hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        // hideLoadingMessage();
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    // showLoadingMessage();
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = getPokemonTypes(details);
        // hideLoadingMessage();
      })
      .catch(function (e) {
        console.error(e);
        // hideLoadingMessage();
      });
  }

  // calls the showModal function and display modal
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(() => {
      showModal(item);
    });
  }

  function showLoadingMessage() {
    let header = document.querySelector(".header");
    let loadingMessage = document.createElement("div");
    loadingMessage.innerText = "Loading...";
    loadingMessage.classList.add("loading-message");
    header.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector(".loading-message");
    loadingMessage.remove();
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + capitalize(item.name) + "</h1>");
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);

    let heightElement = $("<p>" + "Height: " + (item.height/10) + " m</p>");
    let weightElement = $("<p>" + "Weight: " + (item.weight/10) + " kgs</p>");
    let typeElement = $("<p>" + "Types: " + item.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
  }
  // object with key/value pair
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

function getPokemonTypes(pokemon){
  if(Object.keys(pokemon.types).length > 1){
    return [capitalize(pokemon.types[0].type.name), capitalize(pokemon.types[1].type.name)];
  } else {
    return capitalize(pokemon.types[0].type.name);
  }
}