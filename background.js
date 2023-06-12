
let currentPokemon = {
    name: "",
    imageUrl: ""
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    const pokemonId = Math.ceil(Math.random()*151)
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(json => setAttributes(json))
});


function setAttributes(json){
    currentPokemon.name = json.forms[0].name
    currentPokemon.imageUrl = json.sprites.front_default
};


chrome.runtime.onMessage.addListener(sendPokeBall);
function sendPokeBall(request, sender, sendResponse){
    if(request.text === "REQUEST_POKEMON"){
        sendResponse(currentPokemon);
    }
};



