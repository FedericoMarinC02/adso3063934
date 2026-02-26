import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    //Data
    const pokemons = [
        { id: 1, name: "Charizard", type: "Dragon", power: 534, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charizard.avif" },
        { id: 2, name: "Squirtle", type: "Water", power: 314, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/squirtle.avif" },
        { id: 3, name: "Ninetales", type: "Fire", power: 505, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/ninetales.avif" },
        { id: 4, name: "Lugia", type: "Psychic", power: 680, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/lugia.avif" },
        { id: 5, name: "Palkia", type: "Water", power: 680, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/palkia.avif" },
        { id: 6, name: "Scolipede", type: "Poison", power: 680, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/scolipede.avif"},
        { id: 7, name: "Giratina", type: "Ghost", power: 680, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/giratina.avif" },
        { id: 8, name: "Mega Charizard", type: "Mega", power: 634, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charizard-mega-x.avif"},
        { id: 9, name: "Mega Rayquaza", type: "Mega", power: 780, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/rayquaza-mega.avif"}
    ];

    //Styles
    const styles = {
        cards: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            padding: "20px"
        }
    }


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Passing data from parent to child components using props.</p>
            <div style={styles.cards}>
                {/* We pass different props to each CardPokemon component */}
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            legendary={pokemon.legendary}
                            image={pokemon.img}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Example3Props;