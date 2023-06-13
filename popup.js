const title = document.querySelector('#pokemon_name')
const image = document.querySelector('.pokemon_image')
const button = document.querySelector('.catch')
const level = document.querySelector('span')
const myPokemon = document.querySelector('#pokeBall')
const myPokemonBtn = document.querySelector('#my_pokemon')



chrome.runtime.sendMessage({text:"REQUEST_POKEMON"},showPokemon)

function catchPokemon(response){
    button.addEventListener('click', () => {
        localStorage.setItem('pokemon', response.name)
        localStorage.setItem('pokemon_image', response.imageUrl)
        localStorage.setItem('level', response.level)
        title.innerText = `You caught a ${response.name}`
    })
}
function showPokemon(response){
    console.log(response)
    title.innerText = `A wild ${response.name} appeared`
    image.src = response.imageUrl
    level.innerText = response.level
    catchPokemon(response)
}

myPokemonBtn.addEventListener('click', displayMyPoke)

function displayMyPoke(){
    if(!!localStorage.pokemon){
        myPokemon.classList.toggle('show')
        myPokemon.querySelector('h3').innerText = `${localStorage.pokemon}, lvl ${localStorage.level}`
        myPokemon.querySelector('img').src = localStorage.pokemon_image
    }
}