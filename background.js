
let currentPokemon = {
    name: "rattata",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
    level: 1
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    const pokemonId = Math.ceil(Math.random()*151)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(json => setAttributes(json))
});



chrome.runtime.onMessage.addListener(sendPokeBall);


function setAttributes(json){
    currentPokemon.name = json.forms[0].name
    currentPokemon.imageUrl = json.sprites.front_default
    currentPokemon.level = Math.ceil(Math.random() * 100)
};

function sendPokeBall(request, sender, sendResponse){
    if(request.text === "REQUEST_POKEMON"){
        sendResponse(currentPokemon);
    }
};



