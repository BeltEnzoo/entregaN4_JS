const inputID = document.getElementById('inputPoke');
const searchButton = document.getElementById('search-btn');
// const errorMesage = document.querySelector('.errorMesage');
const renderCard = document.getElementById('renderCard')

// console.log(inputID, searchButton)

const searchPokemon = async (evento) => {
    evento.preventDefault();
    const inputEntered = inputID.value.trim();
    // console.log(inputEntered)
    renderCard.innerHTML = '';

    // VALIDACION DEL INPUT

    const ID = parseInt(inputEntered, 10); //convertir a numero

    if(isNaN(ID)){
        renderCard.innerHTML = '<p class="error">el ID ingresado debe ser numerico</p>'
        inputID.value = '';
        
    } 
    if(ID <= 0){
        renderCard.innerHTML = '<p class="error">el ID debe ser mayor a cero</p>'
        inputID.value = '';
        
    } 

    //LLAMADO A LA API

    try { 
        const data = await fetch (`https://pokeapi.co/api/v2/pokemon/${ID}`);
        if(!data.ok){
            throw new Error("Pokemon no encontrado,putito");
        }
        const pokemon = await data.json();
        // console.log(pokemon)

        const name = pokemon.name;
        const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(", ");
        const height = pokemon.height / 10; // Convertir a metros
        const weight = pokemon.weight / 10; // Convertir a kilogramos
        const image = pokemon.sprites.front_default;


        renderCard.innerHTML = `
            <div class="pokemon-info">
                <img src="${image}" alt="${name}" />
                <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                <p><strong>Tipo:</strong> ${types}</p>
                <p><strong>Altura:</strong> ${height} m</p>
                <p><strong>Peso:</strong> ${weight} kg</p>
            </div>
        `;
        
    } catch (error) {
        renderCard.innerHTML = `<p class="error">${error.message}</p>`;
    }
    // renderCard.innerHTML = ''
}


const init = () => {
    searchButton.addEventListener('click', searchPokemon)
}
init();