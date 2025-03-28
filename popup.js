const pokeName = document.getElementById("wild-poke-name")
const pokeImg = document.getElementById("wild-poke-img");
const pokeLevel = document.getElementById("wild-poke-level");
const catcheMeBtn = document.getElementById("catchMeBtn");
const testDiv = document.getElementById("testDiv");
const starterScreen = document.getElementById("starterScreen");
const mainScreen = document.querySelector(".battle-container");
const teamScreen = document.getElementById("teamScreen");
var currentPokemon;


const port = chrome.runtime.connect({ name: "TEAM_ROCKET" });


//delete localStorage for new user testing
// localStorage.removeItem("pokemonCollection");

port.postMessage({ request: "SEND_INITIAL_POKEMON" });

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
      // port.postMessage({ request: "SEND_POKEMON" });
  } 
   else if (msg.pokemonFound) {
      console.log("NEW POKEMON FOUND !!!");
      console.log(msg.pokemonFound);
      // testDiv.innerHTML += `<p>Pokemon Found</p>`;
      // setAttributes(msg.pokemonFound);
      currentPokemon = {...msg.pokemonFound};
      console.log("CURRENT POKEMON NOW!!!");
      console.log(currentPokemon);
      pokeImg.src = msg.pokemonFound.imageUrl;

      // currentPokemon = msg.starterPokemon;
      pokeImg.src = msg.pokemonFound.imageUrl;
      pokeName.innerHTML = msg.pokemonFound.name;
      pokeLevel.innerHTML = msg.pokemonFound.level;
      // port.disconnect(); // Optional: Disconnect when done
  } else if (msg.done) {
      // testDiv.innerHTML += `<p>${msg.done}</p>`;
      // port.disconnect(); // Optional: Disconnect when done
  }
});


initCheatCodes();

console.log("New user? ", newUser());



if (newUser()) {
  teamScreen.style.display = "block";
  starterScreen.style.display = "none";
  mainScreen.style.display = "none";
} else {
  teamScreen.style.display = "none";
  starterScreen.style.display = "none";
  mainScreen.style.display = "flex";
}

document.querySelectorAll(".team-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedTeam = btn.dataset.team;
    localStorage.setItem("selectedTeam", selectedTeam);
    teamScreen.style.display = "none";
    starterScreen.style.display = "block";
    if (selectedTeam === "evil") {
      evilStarterScreen.style.display = "block";
      starterScreen.style.display = "none";
    } else {
      starterScreen.style.display = "block";
      evilStarterScreen.style.display = 'none';
    }
  });
});

document.querySelectorAll(".starter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const id = btn.dataset.id;
    const index = btn.dataset.index;
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    console.log(name, id); // ✅ test here

    const starterPokemon = {
      id:id,
      name: name,
      imageUrl: image,
      level: 5,
      index: 1
    };
    localStorage.setItem("pokemonCollection", JSON.stringify([starterPokemon]));

    starterScreen.style.display = "none";
    evilStarterScreen.style.display = "none";
    mainScreen.style.display = "flex";
  });
});

catcheMeBtn.addEventListener('click', () => {

    const pokemon = { ...currentPokemon };
    let pokemonCollection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
    if(pokemonCollection.length < 6){
        // pokemonCollection.push(pokemon);
        savePokemomLocally(pokemon);
        // localStorage.setItem('pokemonCollection', JSON.stringify(pokemonCollection));
        // title.innerText = `You caught a ${response.name}`
    } else{
        console.log("Maximum team is 6 pokemons... chose wisel !!");
        console.log(pokemonCollection.length);
        alert("🚫 Your team is full!\nYou can only have 6 Pokémon at a time. Click Restart to empty your team.");
    }
    
    port.postMessage({ request: "SEND_POKEMON" });
    
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
    // collection.push(specialPokemon);
    savePokemomLocally(specialPokemon);

    // localStorage.setItem("pokemonCollection", JSON.stringify(collection));
    alert(`You unlocked ${specialPokemon.name}! 🥳`);

    // Clear input
    input.value = "";

    starterScreen.style.display = "none";
    mainScreen.style.display = "flex";
  });

  document.getElementById("restart").addEventListener("click", ()=>{
    starterScreen.style.display = "none";
    evilStarterScreen.style.display = "none";
    mainScreen.style.display = "none";
    teamScreen.style.display = "block"
    localStorage.clear();

  });

  document.getElementById("respawn").addEventListener("click", ()=>{
    port.postMessage({ request: "SEND_POKEMON" });
  });

  function savePokemomLocally(pokemon){
    const collection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
    const newPokemon = {...pokemon};

    newPokemon.index = collection.length + 1;
    collection.push(newPokemon);
    localStorage.setItem("pokemonCollection", JSON.stringify(collection));
  }
    
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
        index: 1,
        name: "Gyarados",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
        level: 150
      },
      vulpix: {
        index: 1,
        id: 23,
        name: "Vulpix",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/37.png", 
        level: 150
      },
      abra: {
        index: 1,
        id: 63,
        name: "Abra",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/63.png",
        level: 150
      },
      mew: {
        index: 1,
        id: 151,
        name: "Mew",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png",
        level: 150
      },
      pikagod: {
        index: 1,
        name: "Pikachu (God Mode)",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        level: 99
      },
      ponyta: {
        index: 1,
        id: 77,
        name: "Ponyta",
        imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png",
        level: 24
      }
    };
  
    localStorage.setItem("cheatCodes", JSON.stringify(cheatList));
  }

  function setAttributes(json){
    currentPokemon.name = json.forms[0].name
    currentPokemon.imageUrl = json.sprites.front_default
    currentPokemon.level = Math.ceil(Math.random() * 20)
    currentPokemon.id = json.id
};