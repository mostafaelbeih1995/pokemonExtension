let currentPokemon = {
    id: 19,
    name: "rattata",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
    level: 1
};

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name !== "TEAM_ROCKET") return;
    console.log("Connected to popup via port");
    port.postMessage({starterPokemon: currentPokemon});
    port.onMessage.addListener(function(msg) {
      if (msg.request === "SEND_INITIAL_POKEMON") {
        port.postMessage({ question: "Who's there?" });
        // port.postMessage({ newUser: checkNewUser() });
      } else if (msg.answer === "Madame") {
        port.postMessage({ question: "Madame who?" });
      } else if (msg.answer === "Madame... Bovary") {
        port.postMessage({ done: "😂 Good one!" });
      }
      else if (msg.request === "SEND_POKEMON") {

        console.log("Send new pokemon request......."); 

        const pokemonId = Math.ceil(Math.random()*101)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(json => {
          // setAttributes(json);
          currentPokemon = {
            id: json.id,
            name: json.forms[0].name,
            imageUrl: json.sprites.front_default,
            level: Math.ceil(Math.random() * 20)
          };
          console.log(currentPokemon);
          port.postMessage({ pokemonFound: currentPokemon });
        });
      }
    });
  
    port.onDisconnect.addListener(() => {
      console.log("Port disconnected.");
    });
  });
  
function setAttributes(json){
    currentPokemon.name = json.forms[0].name;
    currentPokemon.imageUrl = json.sprites.front_default;
    currentPokemon.level = Math.ceil(Math.random() * 20);
    currentPokemon.id = json.id;
};