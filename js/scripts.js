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
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    // click event to show console.log(pokemon)
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
        item.types = details.types;
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
      showModal(item.name, item.height, item.imageUrl);
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

  // modal that contains more information about individual pokemons
  let modalContainer = document.querySelector("#modal-container");

  function showModal(title, text, image) {
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // close button
    let closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.innerHTML = "Close";
    closeButton.addEventListener("click", hideModal);

    // title element
    let titleElement = document.createElement("h1");
    titleElement.classList.add("modal-title");
    titleElement.innerHTML = title;

    // content element
    let content = document.createElement("p");
    content.classList.add("modal-content");
    content.innerHTML = "Height: " + text;

    // image element
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-image");
    imageElement.src = image;

    // append all buttons and contents to modal and modal container
    modal.appendChild(closeButton);
    modal.appendChild(titleElement);
    modal.appendChild(content);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  // hide modal
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  // when user click 'Esc', hide modal
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // when user click anywhere other than modal, hide modal
  modalContainer.addEventListener("click", e => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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