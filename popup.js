const title = document.querySelector('#pokemon_name')
const image = document.querySelector('.pokemon_image')

chrome.runtime.sendMessage({text:"REQUEST_POKEMON"},showPokemon)

function showPokemon(response){
    console.log(response)
    title.innerText = response.name
    image.src = response.imageUrl
}
function logPokemon(response){
    console.log(response)
}