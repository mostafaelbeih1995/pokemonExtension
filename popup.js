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
    rewritePokemonList();
    console.log(response)
    let pokemons = localStorage.getItem("pokemonCollection");
    console.log(pokemons);
    title.innerText = `A wild ${response.name} appeared neek`
    image.src = response.imageUrl
    level.innerText = response.level
    catchPokemon(response)
}

// Compile the templates
const profileTemplateSource = document.getElementById('profile-template').innerHTML;
const buttonTemplateSource = document.getElementById('button-template').innerHTML;

// Compile the templates using Handlebars
const profileTemplate = Handlebars.compile(profileTemplateSource);
const buttonTemplate = Handlebars.compile(buttonTemplateSource);

// Context data for the templates
const profileData = {
  name: 'John Doe',
  email: 'john@example.com',
};

const buttonData = {
  label: 'Click Me',
};

// Render the profile template
document.getElementById('profile').innerHTML = profileTemplate(profileData);

// Render the button template and insert it into the container
document.getElementById('container').innerHTML = buttonTemplate(buttonData);

// Adding event listener to the button
document.querySelector('.handlebars-btn').addEventListener('click', () => {
  alert('Button clicked!');
});
