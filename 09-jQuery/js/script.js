function buscarPokemon(contenedorNumero) {
    let inputId = `pokemonInput${contenedorNumero}`;
    let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

    fetch(urlApi)
        .then(response => response.json())
        .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
        .catch(() => mostrarError(contenedorNumero));
}

function mostrarPokemon(datosPokemon, contenedorNumero) {
    let infoDivId = `pokemoninfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);

    infoDiv.innerHTML = `
        <h2 class:"pk-name">${datosPokemon.name.toUpperCase()}</h2>
        <img class:"pk-img" src="${datosPokemon.sprites.other['official-artwork'].front_default}">
        <p>Número: ${datosPokemon.id}</p>
        <p>weight: ${datosPokemon.weight / 10} Kg</p>
        <p>heigth: ${datosPokemon.height / 10} M</p>
    `;
}

function mostrarError(contenedorNumero) {
    let infoDivId = `pokemoninfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);
    infoDiv.innerHTML = `
    <p class:"pk-ms">Pokemón No Encontrado. <br> Intenta con otro número.</p>
`;
}

window.onload = function() {
    document.getElementById("pokemonInput1").value = "25";
    buscarPokemon(1);
    document.getElementById("pokemonInput2").value = "4";
    buscarPokemon(2);
};