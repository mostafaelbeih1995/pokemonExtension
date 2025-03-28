document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";
    let currentPage = 1;
    const limit = 10;
    let myPokemonList = JSON.parse(localStorage.getItem("pokemonCollection"));

    function fetchPokemonList(page) {
        const offset = (page - 1) * limit;
        const pokemonList = document.getElementById("pokemonList");
        pokemonList.innerHTML = "";
        myPokemonList.forEach((pokemon, index) => {
            console.log(myPokemonList);
            let pokemonItem = document.createElement("div");
            // pokemonItem.className = "pokemon-item-new";
            // pokemonItem.setAttribute("data-url", pokemon.image);
            // pokemonItem.setAttribute("data-tooltip", pokemon.name);
            pokemonItem.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
                <span>${capitalize(pokemon.name)}</span>
                <button class="delete-btn" data-index="${index}">✖</button>
            `;
            // pokemonItem.addEventListener("click", () => fetchPokemonDetails(pokemon.url));
            pokemonList.appendChild(pokemonItem);
        });

        setTimeout(() => {
            document.querySelectorAll(".delete-btn").forEach(button => {
              button.addEventListener("click", (e) => {
                e.stopPropagation(); // just in case there's a parent click
                const index = parseInt(e.target.getAttribute("data-index"));
                if (!isNaN(index)) {
                  myPokemonList.splice(index, 1); // remove from array
                  localStorage.setItem("pokemonCollection", JSON.stringify(myPokemonList));
                  fetchPokemonList(page); // re-render
                }
              });
            });
          }, 0);
                // updatePagination(data.previous, data.next);
    }

    // function fetchPokemonDetails(url) {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(pokemon => {
    //             document.getElementById("pokeName").textContent = capitalize(pokemon.name);
    //             document.getElementById("pokeImage").src = pokemon.sprites.front_default;
    //             document.getElementById("pokeType").textContent = pokemon.types.map(t => t.type.name).join(", ");
    //             document.getElementById("pokeHeight").textContent = pokemon.height;
    //             document.getElementById("pokeWeight").textContent = pokemon.weight;
    //             document.getElementById("pokeAbilities").textContent = pokemon.abilities.map(a => a.ability.name).join(", ");
    //             document.getElementById("pokemonDetails").style.display = "block";
    //         });
    // }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function updatePagination(previous, next) {
        document.getElementById("prevPage").disabled = !previous;
        document.getElementById("nextPage").disabled = !next;
    }

    document.getElementById("searchInput").addEventListener("input", function () {
        let value = this.value.toLowerCase();
        document.querySelectorAll(".pokemon-item").forEach(function (item) {
            let name = item.textContent.toLowerCase();
            item.style.display = name.includes(value) ? "flex" : "none";
        });
    });

    // document.querySelectorAll(".delete-btn").forEach(button => {
    //     button.addEventListener("click", (e) => {
    //     console.log("Delete btn triggered");
    //     const index = e.target.getAttribute("data-index");
    //     myPokemonList.splice(index, 1); // remove from array

    //     localStorage.setItem("pokemonCollection", JSON.stringify(collection));
    //     fetchPokemonList(page); // re-render
    //     });
    //   });

    document.getElementById("closeDetails").addEventListener("click", function () {
        document.getElementById("pokemonDetails").style.display = "none";
    });

    // document.getElementById("prevPage").addEventListener("click", function () {
    //     if (currentPage > 1) {
    //         currentPage--;
    //         fetchPokemonList(currentPage);
    //     }
    // });

    // document.getElementById("nextPage").addEventListener("click", function () {
    //     currentPage++;
    //     fetchPokemonList(currentPage);
    // });

    fetchPokemonList(currentPage);
});
