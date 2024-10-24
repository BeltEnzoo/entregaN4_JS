const inputID = document.getElementById('inputPoke');
const searchButton = document.getElementById('search-btn');
// const errorMesage = document.querySelector('.errorMesage');
const renderCard = document.getElementById('renderCard')

// console.log(inputID, searchButton)

const searchPokemon = async (evento) => {
    evento.preventDefault();
    const inputEntered = inputID.value.trim();
    // console.log(inputEntered)

    // VALIDACION DEL INPUT
    if (!inputEntered || isNaN(inputEntered) || inputEntered <= 0){
        renderCard.innerHTML = '<p class="error">Numero no valido</p>'
        inputID.value = '';
        return;
    }else {
        renderCard.innerHTML = '';
    }

    //LLAMADO A LA API

    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputEntered}`);
        if (!data.ok) {
            throw new Error('Pokémon no encontrado');
        }
        const pokemon = await data.json();
        renderPokemonCard(pokemon);
    } catch (error) {
        resultContainer.innerHTML = '<div class="error">Error: Pokémon no encontrado.</div>';
    }
  
}


const init = () => {
    searchButton.addEventListener('click', searchPokemon)
}
init();