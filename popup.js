const title = document.querySelector('#pokemon_name')
const image = document.querySelector('.pokemon_image')
const catchBtn = document.querySelector('.catch')
const level = document.querySelector('span')
const pokemonList = document.querySelector('#pokeBall')
const myPokemonBtn = document.querySelector('#my_pokemon')



chrome.runtime.sendMessage({text:"REQUEST_POKEMON"},showPokemon)

myPokemonBtn.addEventListener('click', displayMyPoke)

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
            console.log("rewriting child nodes..");
            const h3Element = document.createElement("h3");
            const imgElement = document.createElement("img");
            h3Element.innerText = `${pokemonCollection[i].name}, lvl ${pokemonCollection[i].level}`;
            imgElement.src = pokemonCollection[i].imageUrl;
            imgElement.className = "pokemon_image";
            pokemonList.appendChild(h3Element);
            pokemonList.appendChild(imgElement);
        }

    }
}

function displayMyPoke(){

    pokemonList.classList.toggle('show');
}

function catchPokemon(response){
    catchBtn.addEventListener('click', () => {
        let pokemonCollection = JSON.parse(localStorage.getItem("pokemonCollection")) || [];
        const pokemon = {
            name: response.name,
            imageUrl: response.imageUrl,
            level: response.level
        }
        pokemonCollection.push(pokemon);
        localStorage.setItem('pokemonCollection', JSON.stringify(pokemonCollection));
        rewritePokemonList();
        title.innerText = `You caught a ${response.name}`
    })
}
function showPokemon(response){
    rewritePokemonList();
    console.log(response)
    let pokemons = localStorage.getItem("pokemonCollection");
    console.log(pokemons);
    title.innerText = `A wild ${response.name} appeared`
    image.src = response.imageUrl
    level.innerText = response.level
    catchPokemon(response)
}