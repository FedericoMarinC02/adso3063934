import './CardPokemonCapture.css';

function CardPokemonCapture({ name, type, power, level, image, legendary = false, isCaptured = false }) {

    const typeColors = {
        "Ghost": "#6A0DAD",
        "Psychic": "#FF69B4",
        "Fire": "#f94332",
        "Water": "#1E90FF",
        "Dragon": "#FF4500",
        "Poison": "#590556",
        "Mega": "#87ff47",
        "Electric": "#FFD700",
        "Grass": "#32CD32",
        "Ice": "#87CEEB",
        "Fighting": "#8B4513",
        "Flying": "#ADD8E6",
        "Ground": "#D2B48C",
        "Rock": "#A9A9A9",
        "Bug": "#90EE90",
        "Steel": "#C0C0C0",
        "Fairy": "#FFB6C1",
        "Dark": "#696969",
    }

    return (
        <div className={`pokemon-card-capture${legendary ? ' legendary-card' : ''}${isCaptured ? ' captured' : ''}`} style={{ borderColor: typeColors[type] || "#ccc" }}>
            {isCaptured && <div className="captured-ribbon">Capturado</div>}
            <img src={image} alt={name} className={`pokemon-image${isCaptured ? ' grayscale' : ''}`} />
            <h3>{name}</h3>
            <p className='pokemon-type'>Type: {type}</p>
            {level !== undefined && <p className='pokemon-level'>Level: {level}</p>}
            <p className='pokemon-power'>Power: {power}</p>
            {legendary && <span className='legendary-badge'>⭐Legendary⭐</span>}
        </div>
    );
}

export default CardPokemonCapture;
