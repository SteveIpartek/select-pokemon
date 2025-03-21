

document.addEventListener('DOMContentLoaded', () => {
    const pokemonSelect = document.getElementById('pokemon-select');
    const getPokemonButton = document.getElementById('get-pokemon');
    const container = document.querySelector('.container');
  
    getPokemonButton.addEventListener('click', () => {
      const pokemonName = pokemonSelect.value;
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(pokemonData => {
          displayPokemonInfo(pokemonData);
        })
        .catch(error => {
          console.error('Error fetching Pokémon:', error);
          container.innerHTML = `<p>Error fetching Pokémon data.</p>`;
        });
    });
  
    function displayPokemonInfo(pokemon) {
      let types = pokemon.types.map(type => type.type.name).join(', ');
      let abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
      let imageUrl = pokemon.sprites.front_default;
  
      container.innerHTML = `
        <div id="fichapoke">
        <button id="reset">Atras</button>
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img id="imgPokeSty" src="${imageUrl}" alt="${pokemon.name}" style="max-width: 200px;">
        <p><strong>Types:</strong> ${types}</p>
        <p><strong>Height:</strong> ${pokemon.height}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        </div>`;

        
        const resetButton = document.getElementById('reset');

            resetButton.addEventListener('click', function() {
                location.reload();
            });
        
    }
});