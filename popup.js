const pokeName = document.getElementById("wild-poke-name")
const pokeImg = document.getElementById("wild-poke-img")
const catchBtn = document.querySelector('.catch')
const pokeLevel = document.getElementById("wild-poke-level").textContent
const pokemonList = document.querySelector('#pokeBall')
const myPokemonBtn = document.querySelector('#my_pokemon')

const infoBox = document.querySelector(".pokemon-info");
const pokeHealth = document.getElementById("poke-health");



chrome.runtime.sendMessage({text:"REQUEST_POKEMON"},showPokemon)

// myPokemonBtn.addEventListener('click', displayMyPoke)

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
