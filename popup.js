const pokeName = document.getElementById("wild-poke-name")
const pokeImg = document.getElementById("wild-poke-img");
const pokeLevel = document.getElementById("wild-poke-level");
const catcheMeBtn = document.getElementById("catchMeBtn");
var currentPokemon;


const port = chrome.runtime.connect({ name: "TEAM_ROCKET" });
const testDiv = document.getElementById("testDiv");

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
        rewritePokemonList();
        title.innerText = `You caught a ${response.name}`
    } else{
        console.log("Maximum team is 6 pokemons... chose wisel !!");
        console.log(pokemonCollection.length);
    }
    
});
    
function renderComponent(team) {
    const container = document.getElementById("pokemon-title");
    if (container) {
      container.innerHTML = team;
    }
}

function rewritePokemonList(){

    if(!localStorage.getItem("pokemonCollection")){
        console.log("There is no pokemon array, creating a new one...");
        let pokemonCollection = [];
    }else{
        let pokemonCollection = JSON.parse(localStorage.getItem("pokemonCollection"));
        for(let i= pokemonList.childNodes.length-1 ; i >=0; i--){
            console.log("deleting child nodes..");
            pokemonList.removeChild(pokemonList.childNodes[i]);
        }
        for(let i = 0; i < pokemonCollection.length; i++){
            const newPokeItem = document.createElement("div");
            const deletePokemon = document.createElement("button");
            deletePokemon.addEventListener('click', (e) => {
                const nameToDelete = e.target.getAttribute("pokemon-name");
                const levelToDelete = e.target.getAttribute("pokemon-level");
            
                let pokemonCollection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
            
                // Filter out the clicked Pokémon
                const updatedCollection = pokemonCollection.filter(p =>
                    !(p.name === nameToDelete && p.level.toString() === levelToDelete)
                );
            
                localStorage.setItem("pokemonCollection", JSON.stringify(updatedCollection));
                rewritePokemonList(); // Re-render list
            });
            deletePokemon.textContent = "X";
            newPokeItem.classList.add("pokeItem")
            newPokeItem.appendChild(deletePokemon);
            console.log("rewriting child nodes..");
            const h3Element = document.createElement("h3");
            const imgElement = document.createElement("img");
            deletePokemon.setAttribute('pokemon-name', pokemonCollection[i].name)
            deletePokemon.setAttribute('pokemon-level', pokemonCollection[i].level)
            newPokeItem.appendChild(h3Element);
            newPokeItem.appendChild(imgElement);
            h3Element.innerText = `${pokemonCollection[i].name} 
            lvl ${pokemonCollection[i].level}`;
            imgElement.src = pokemonCollection[i].imageUrl;
            imgElement.className = "pokemon_image";
            // pokemonList.appendChild(h3Element);
            // pokemonList.appendChild(imgElement);
            pokemonList.appendChild(newPokeItem);
        }

    }
}

function displayMyPoke(){

    // pokemonList.classList.toggle('show');
}