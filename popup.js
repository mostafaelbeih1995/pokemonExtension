const pokeName = document.getElementById("wild-poke-name")
const pokeImg = document.getElementById("wild-poke-img");
const pokeLevel = document.getElementById("wild-poke-level");
const catcheMeBtn = document.getElementById("catchMeBtn");
const port = chrome.runtime.connect({ name: "TEAM_ROCKET" });
const testDiv = document.getElementById("testDiv");
var currentPokemon;

//delete localStorage for new user testing
// localStorage.removeItem("pokemonCollection");

port.postMessage({ request: "SEND_INITIAL_POKEMON" });
initCheatCodes();

console.log("New user? ", newUser());

const starterScreen = document.getElementById("starterScreen");
const mainScreen = document.querySelector(".battle-container");

  if (newUser()) {
    starterScreen.style.display = "block";
    mainScreen.style.display = "none";
  } else {
    starterScreen.style.display = "none";
    mainScreen.style.display = "flex";
  }

  document.querySelectorAll(".starter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const id = btn.dataset.id;
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      console.log(name, id); // ✅ test here

      const starterPokemon = {
        id:id,
        name: name,
        imageUrl: image,
        level: 5
      };
      localStorage.setItem("pokemonCollection", JSON.stringify([starterPokemon]));

      starterScreen.style.display = "none";
      mainScreen.style.display = "flex";
    });
  });

port.onMessage.addListener((msg) => {

    if(msg.starterPokemon){
        currentPokemon = msg.starterPokemon;
        pokeImg.src = msg.starterPokemon.imageUrl;
        pokeName.innerHTML = msg.starterPokemon.name;
        pokeLevel.innerHTML = msg.starterPokemon.level;
    }
    else if (msg.question === "Who's there?") {
        // testDiv.innerHTML += `<p>${msg.question}</p>`;
        port.postMessage({ answer: "Madame" });
    } else if (msg.question === "Madame who?") {
        // testDiv.innerHTML += `<p>${msg.question}</p>`;
        port.postMessage({ request: "SEND_POKEMON" });
    } else if (msg.request === "SEND_POKEMON") {
        // testDiv.innerHTML += `<p>${msg.question}</p>`;
        port.postMessage({ answer: "Madame... Bovary" });
    } else if (msg.starterPo === "SEND_POKEMON") {
        // testDiv.innerHTML += `<p>${msg.question}</p>`;
        port.postMessage({ answer: "Madame... Bovary" });
    } else if (msg.pokemonFound) {
        // testDiv.innerHTML += `<p>Pokemon Found</p>`;
        pokeImg.src = msg.pokemonFound.imageUrl
        // port.disconnect(); // Optional: Disconnect when done
    } else if (msg.done) {
        // testDiv.innerHTML += `<p>${msg.done}</p>`;
        // port.disconnect(); // Optional: Disconnect when done
    }
});

catcheMeBtn.addEventListener('click', () => {

    let pokemonCollection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
    const pokemon = {
        name: currentPokemon.name,
        imageUrl: currentPokemon.imageUrl,
        level: currentPokemon.level,
        id: currentPokemon.id
    }
    if(pokemonCollection.length < 6){
        pokemonCollection.push(pokemon);
        localStorage.setItem('pokemonCollection', JSON.stringify(pokemonCollection));
        title.innerText = `You caught a ${response.name}`
    } else{
        console.log("Maximum team is 6 pokemons... chose wisel !!");
        console.log(pokemonCollection.length);
    }
    
});

document.getElementById("cheatSubmit").addEventListener("click", () => {
    const input = document.getElementById("cheatCode");
    const cheatCode = input.value.trim().toLowerCase();

    const cheatMap = JSON.parse(localStorage.getItem("cheatCodes"));

    if (!cheatMap || !cheatMap[cheatCode]) {
        alert("Invalid cheat code 🕵️‍♂️");
        input.value = "";
        return;
    }

    const specialPokemon = cheatMap[cheatCode];

    const collection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
    collection.push(specialPokemon);

    localStorage.setItem("pokemonCollection", JSON.stringify(collection));
    alert(`You unlocked ${specialPokemon.name}! 🥳`);

    // Clear input
    input.value = "";

    starterScreen.style.display = "none";
    mainScreen.style.display = "flex";
  });
    
function renderComponent(team) {
    const container = document.getElementById("pokemon-title");
    if (container) {
      container.innerHTML = team;
    }
}

function newUser(){
    let pokemonCollection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
    return pokemonCollection.length == 0;
}

function initCheatCodes() {
    const cheatList = {
        gyarados: {
        id: 130, 
        name: "Gyarados",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
        level: 150
      },
      vulpix: {
        name: "Vulpix",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/37.png", 
        level: 150
      },
      abra: {
        name: "Abra",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/63.png",
        level: 150
      },
      mew: {
        id: 151,
        name: "Mew",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
        level: 150
      },
      pikagod: {
        name: "Pikachu (God Mode)",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        level: 99
      }
    };
  
    localStorage.setItem("cheatCodes", JSON.stringify(cheatList));
  }