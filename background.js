// chrome.runtime.onConnect.addListener(function(port) {
//     if (port.name !== "testPort") return;
  
//     console.log("Connected to popup via port:", port);
  
//     port.onMessage.addListener(function(msg) {
//       if (msg.msg === "Who is that pokemon !!!") {
//         port.postMessage({name: "pikachu"});
//       } else if (msg.answer === "Madame") {
//         port.postMessage({ question: "Madame who?" });
//       } else if (msg.answer === "Madame... Bovary") {
//         port.postMessage({ done: "😂 Good one!" });
//       }
//     });
  
//     port.onDisconnect.addListener(() => {
//       console.log("Port disconnected.");
//     });
//   });

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name !== "TEAM_ROCKET") return;
  
    console.log("Connected to popup via port:", port);
  
    port.onMessage.addListener(function(msg) {
      if (msg.joke === "Knock knock") {
        port.postMessage({ question: "Who's there?" });
      } else if (msg.answer === "Madame") {
        port.postMessage({ question: "Madame who?" });
      } else if (msg.answer === "Madame... Bovary") {
        port.postMessage({ done: "😂 Good one!" });
      }
      else if (msg.request === "SEND_POKEMON") {

        console.log("creating pokemon ......."); 

        const pokemonId = Math.ceil(Math.random()*151)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(json => setAttributes(json))
        console.log(currentPokemon);
        port.postMessage({ pokemonFound: currentPokemon });
      }
    });
  
    port.onDisconnect.addListener(() => {
      console.log("Port disconnected.");
    });
  });
  

let currentPokemon = {
    name: "rattata",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
    level: 1
};

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//     const pokemonId = Math.ceil(Math.random()*151)
//     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
//     .then(response => response.json())
//     .then(json => setAttributes(json))
// });



// chrome.runtime.onMessage.addListener(listenForResponse);


function setAttributes(json){
    currentPokemon.name = json.forms[0].name
    currentPokemon.imageUrl = json.sprites.front_default
    currentPokemon.level = Math.ceil(Math.random() * 100)
};

function listenForResponse(request, sender, sendResponse){
    console.log("Listening to Response..........");
    
    // if(request.text === "REQUEST_POKEMON"){
    //     console.log("Sending pokemon...");
    //     sendResponse(currentPokemon);
    //     return true;
    // }

    if (request.action === "REQUEST_TEAM_INFO") {
        console.log("Sending team info...");
        sendResponse({ team: "rocket" });
        return true
    }
};



