import { useState } from 'react';
import BtnBack from "../components/BtnBack";
import CardPokemonCapture from "../components/CardPokemonCapture";

function Example4StateHooks() {

    //Data - 20 Pokemones diferentes (no repetidos de Example3) incluyendo algunos legendarios
    const allPokemons = [
        { id: 1, name: "Blastoise", type: "Water", power: 530, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/blastoise.avif" },
        { id: 2, name: "Vaporeon", type: "Water", power: 525, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/vaporeon.avif" },
        { id: 3, name: "Jolteon", type: "Electric", power: 525, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/jolteon.avif" },
        { id: 4, name: "Flareon", type: "Fire", power: 525, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/flareon.avif" },
        { id: 5, name: "Espeon", type: "Psychic", power: 525, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/espeon.avif" },
        { id: 6, name: "Umbreon", type: "Dark", power: 525, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/umbreon.avif" },
        { id: 7, name: "Raichu", type: "Electric", power: 485, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/raichu.avif" },
        { id: 8, name: "Kingler", type: "Water", power: 480, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/kingler.avif" },
        { id: 9, name: "Exeggutor", type: "Grass", power: 530, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/exeggutor.avif" },
        { id: 10, name: "Rapidash", type: "Fire", power: 500, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/rapidash.avif" },
        { id: 11, name: "Hypno", type: "Psychic", power: 483, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/hypno.avif" },
        { id: 12, name: "Graveler", type: "Rock", power: 430, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/graveler.avif" },
        { id: 13, name: "Poliwrath", type: "Water", power: 530, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/poliwrath.avif" },
        { id: 14, name: "Tentacruel", type: "Water", power: 500, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/tentacruel.avif" },
        { id: 15, name: "Primeape", type: "Fighting", power: 455, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/primeape.avif" },
        { id: 16, name: "Mewtwo", type: "Psychic", power: 680, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mewtwo.avif" },
        { id: 17, name: "Mew", type: "Psychic", power: 600, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mew.avif" },
        { id: 18, name: "Ho-Oh", type: "Fire", power: 680, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/ho-oh.avif" },
        { id: 19, name: "Kyogre", type: "Water", power: 670, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/kyogre.avif" },
        { id: 20, name: "Groudon", type: "Ground", power: 670, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/groudon.avif" }
    ];

    // States para manejar la captura
    const [capturedPokemons, setCapturedPokemons] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);

    // Función para capturar un pokemón aleatorio (sin repetir)
    const handleCapture = () => {
        // Obtener IDs de pokemones ya capturados
        const capturedIds = capturedPokemons.map(p => p.id);
        // Filtrar pokemones disponibles (no capturados)
        const availablePokemons = allPokemons.filter(p => !capturedIds.includes(p.id));
        
        // Si no hay pokemones disponibles, no hacer nada
        if (availablePokemons.length === 0) {
            alert("¡Ya has capturado todos los pokemones!");
            return;
        }

        setIsCapturing(true);

        // Simular tiempo de captura (2 segundos)
        setTimeout(() => {
            // Seleccionar un pokemón aleatorio de los disponibles
            const randomIndex = Math.round(Math.random() * (availablePokemons.length - 1));
            const captured = availablePokemons[randomIndex];
            
            setCapturedPokemons(prev => [captured, ...prev]);
            setIsCapturing(false);
        }, 2000);
    };

    // Styles
    const styles = {
        container: {
            padding: "20px"
        },
        cards: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            padding: "20px"
        },
        captureSection: {
            textAlign: "center",
            margin: "20px 0",
            padding: "20px",
            backgroundColor: "#1a1a1a",
            borderRadius: "0.8rem",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        },
        capturedCard: {
            border: "2px solid #FFD700",
            borderRadius: "0.8rem",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#0006",
            maxWidth: "300px"
        },
        capturedImage: {
            height: "150px",
            width: "150px",
            objectFit: "cover"
        }
    };

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 4: State & Hooks - Pokemon Capture</h2>
            <p>Captura pokemones aleatorios.</p>

            {/* Sección de captura */}
            <div style={styles.captureSection}>
                <button 
                    onClick={handleCapture}
                    disabled={isCapturing}
                    style={{
                        padding: "12px 30px",
                        fontSize: "1rem",
                        backgroundColor: isCapturing ? "#CCCCCC" : "#FF6B6B",
                        color: "white",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontWeight: "bold",
                        cursor: isCapturing ? "not-allowed" : "pointer",
                        transition: "all 0.3s ease-in-out"
                    }}
                >
                    {isCapturing ? 'Capturando pokemon...' : 'Capturar Pokemon'}
                </button>
                <p style={{ marginTop: "15px", color: "#999", fontSize: "0.9rem" }}>
                    Pokemones capturados: {capturedPokemons.length}
                </p>
            </div>

            {/* Lista de pokemones capturados */}
            {capturedPokemons.length > 0 && (
                <div style={{ padding: "20px", backgroundColor: "#1a1a1a", borderRadius: "0.8rem", margin: "20px 0" }}>
                    <h3 style={{ textAlign: "center", color: "#FFD700" }}>Mi Colección ({capturedPokemons.length})</h3>
                    <div style={styles.cards}>
                        {capturedPokemons.map((pokemon, index) => (
                            <div 
                                key={index}
                                style={{
                                    border: "2px solid #FFD700",
                                    borderRadius: "0.8rem",
                                    padding: "15px",
                                    textAlign: "center",
                                    backgroundColor: "#0006",
                                    width: "200px"
                                }}
                            >
                                <img src={pokemon.img} alt={pokemon.name} style={{ height: "100px", width: "100px", objectFit: "cover" }} />
                                <h4 style={{ margin: "10px 0 5px 0" }}>{pokemon.name}</h4>
                                <p style={{ margin: "3px 0", fontSize: "0.85rem", color: "#ccc" }}>{pokemon.type}</p>
                                <p style={{ margin: "3px 0", fontSize: "0.85rem", color: "#ddd" }}>Power: {pokemon.power}</p>
                                {pokemon.legendary && <p style={{ color: "#FFD700", fontSize: "0.8rem", fontWeight: "bold" }}>⭐ LEGENDARY</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Grid de pokemones disponibles */}
            <div style={{ marginTop: "30px" }}>
                <h3 style={{ textAlign: "center" }}>Pokemones Disponibles</h3>
                <div style={styles.cards}>
                    {allPokemons.map(pokemon => {
                        const isCaptured = capturedPokemons.some(p => p.id === pokemon.id);
                        return (
                            <CardPokemonCapture
                                key={pokemon.id}
                                name={pokemon.name}
                                type={pokemon.type}
                                power={pokemon.power}
                                legendary={pokemon.legendary}
                                image={pokemon.img}
                                isCaptured={isCaptured}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Example4StateHooks;
