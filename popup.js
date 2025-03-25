document.getElementById("test").addEventListener("click", () => {
    const port = chrome.runtime.connect({ name: "TEAM_ROCKET" });
    const testDiv = document.getElementById("testDiv");
  
    port.postMessage({ joke: "Knock knock" });
  
    port.onMessage.addListener((msg) => {
      if (msg.question === "Who's there?") {
        testDiv.innerHTML += `<p>${msg.question}</p>`;
        port.postMessage({ answer: "Madame" });
      } else if (msg.question === "Madame who?") {
        testDiv.innerHTML += `<p>${msg.question}</p>`;
        port.postMessage({ request: "SEND_POKEMON" });
    } else if (msg.request === "SEND_POKEMON") {
        testDiv.innerHTML += `<p>${msg.question}</p>`;
        port.postMessage({ answer: "Madame... Bovary" });
    } else if (msg.pokemonFound) {
        testDiv.innerHTML += `<p>Pokemon Found</p>`;
        port.disconnect(); // Optional: Disconnect when done
      } else if (msg.done) {
        testDiv.innerHTML += `<p>${msg.done}</p>`;
        port.disconnect(); // Optional: Disconnect when done
      }
    });
});
// const pokeName = document.getElementById("wild-poke-name")
// const pokeImg = document.getElementById("wild-poke-img")
// const catchBtn = document.querySelector('.catch')
// const pokeLevel = document.getElementById("wild-poke-level").textContent
// const pokemonList = document.querySelector('#pokeBall')
// const myPokemonBtn = document.querySelector('#my_pokemon')

// const infoBox = document.querySelector(".pokemon-info");
// const pokeHealth = document.getElementById("poke-health");

// document.getElementById("clickBtn").addEventListener("click", () => {
//     // getTeamInfo();
//     // renderComponent('Smoke Test !!!!!')
//     const port = chrome.runtime.connect({ name: "testPort" });
//     port.postMessage({msg: "Who is that pokemon !!!"});
//     port.onMessage.addListener((msg) => {
//         if(msg.name === "pikachu"){
//             //change innterHTML of something
//             console.log("type electricity");
//         }
//     });
// });

// chrome.runtime.sendMessage({text:"REQUEST_POKEMON"},showPokemon)
// document.addEventListener("DOMContentLoaded", () => {
    
//     const btn = document.getElementById("clickBtn");
//     btn.addEventListener("click", () => {
//         getTeamInfo();
//         renderComponent('Smoke Test !!!!!')

//     });
//   });
  
  function renderComponent(team) {
    const container = document.getElementById("pokemon-title");
    if (container) {
      container.innerHTML = team;
    }
  }
// myPokemonBtn.addEventListener('click', displayMyPoke)

function getTeamInfo(){
    chrome.runtime.sendMessage({ action: "REQUEST_TEAM_INFO" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message failed:", chrome.runtime.lastError.message);
          return;
        }
      
        if (response && response.team) {
          console.log("Team received:", response.team);
          renderComponent(response.team);
        } else {
          console.warn("No team info received.");
        }
      });
      
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

function catchPokemon(response){
    catchBtn.addEventListener('click', () => {
        let pokemonCollection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
        const pokemon = {
            name: response.name,
            imageUrl: response.imageUrl,
            level: response.level
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
        
    })
}
function showPokemon(response){
    console.log("receiveddd..................")
    // rewritePokemonList();
    console.log(response);
    let pokemons = localStorage.getItem("pokemonCollection");
    console.log(pokemons);
    // title.innerText = `A wild ${response.name} appeared neek`
    // image.src = response.imageUrl
    // level.innerText = response.level
    pokeName.innerHTML = `A wild ${response.name} appeared neek`
    pokeImg.src = response.imageUrl
    pokeLevel.innerHTML = response.level
    
    // catchPokemon(response)
}

const pokeballs = document.querySelectorAll(".pokeball");
    const backgrounds = [
        './assets/forest.webp',
        'background2.jpg',
        'background3.jpg',
        'background4.jpg'
    ];

    function switchBackground() {
        const background1 = document.querySelector('.background-1');
        const background2 = document.querySelector('.background-2');
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        background1.style.backgroundImage = `url('./assets/battleback${randomIndex+1}-1.png')`;
        background2.style.backgroundImage = `url('./assets/battleback${randomIndex+1}-2.png')`;
    }

    switchBackground();