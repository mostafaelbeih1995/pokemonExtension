const pokeballs = document.querySelectorAll(".pokeball");
        const infoBox = document.querySelector(".pokemon-info");
        const pokeName = document.getElementById("poke-name");
        const pokeImg = document.getElementById("poke-img");
        const pokeLevel = document.getElementById("poke-level");
        const pokeHealth = document.getElementById("poke-health");

        async function getRandomPokemon() {
            let randomId = Math.floor(Math.random() * 151) + 1; // Gen 1 Pokémon (1-151)
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            let data = await response.json();
            return {
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                img: data.sprites.front_default,
                level: Math.floor(Math.random() * 50) + 1,
                hp: Math.floor(Math.random() * 100) + 20
            };
        }

        pokeballs.forEach(pokeball => {
            pokeball.addEventListener("mouseenter", async () => {
                let pokemon = await getRandomPokemon();
                pokeName.textContent = pokemon.name;
                pokeImg.src = pokemon.img;
                pokeLevel.textContent = pokemon.level;
                pokeHealth.style.width = pokemon.hp + "%";
                pokeHealth.style.background = pokemon.hp > 50 ? "#28a745" : "#dc3545";
                infoBox.style.display = "block";
            });

            pokeball.addEventListener("mouseleave", () => {
                infoBox.style.display = "none";
            });
        });
        async function getRandomPokemon() {
            let randomId = Math.floor(Math.random() * 151) + 1;
            let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            let data = await response.json();
            return {
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                img: data.sprites.front_default,
                level: Math.floor(Math.random() * 50) + 1
            };
        }
    
        async function showWildPokemon() {
            let pokemon = await getRandomPokemon();
            document.getElementById("wild-poke-name").textContent = pokemon.name;
            document.getElementById("wild-poke-img").src = pokemon.img;
            document.getElementById("wild-poke-level").textContent = pokemon.level;
        }
    
        showWildPokemon();

        const backgrounds = [
            './assets/forest.webp',
            'background2.jpg',
            'background3.jpg',
            'background4.jpg'
        ];

        function switchBackground() {
            const battleBackground = document.querySelector('.battle-background');
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            battleBackground.src = `./assets/battleback${randomIndex+1}.png`;
        }

        switchBackground();