import { useState } from "react";
import BtnBack from "../components/BtnBack";
import "./Example5Eventos.css";

function Example5Eventos() {
  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [hoveredPokemon, setHoveredPokemon] = useState(null);
  const [inputRange, setInputRange] = useState(0);

  const typeColors = {
    Dragon: "#FF4500",
    Water: "#1E90FF",
    Fire: "#f94332",
    Psychic: "#FF69B4",
    Electric: "#FFD700",
    Dark: "#696969",
    Fairy: "#FFB6C1",
    Ghost: "#6A0DAD",
    Fighting: "#8B4513",
    Normal: "#8a8a8a",
  };

  const clickPokemons = [
    {
      name: "Eevee",
      badge: "Base",
      type: "Normal",
      power: 300,
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    },
    {
      name: "Lucario",
      badge: "Aura",
      type: "Fighting",
      power: 525,
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
    },
    {
      name: "Snorlax",
      badge: "Rest",
      type: "Normal",
      power: 540,
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    },
  ];

  const hoverPokemons = [
    {
      name: "Gengar",
      type: "Ghost",
      power: 500,
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    },
    {
      name: "Sylveon",
      type: "Fairy",
      power: 525,
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png",
    },
  ];

  const handleChoice = (name) => setChosenPokemon(name);
  const handleMouseEnter = (name) => setHoveredPokemon(name);
  const handleMouseLeave = () => setHoveredPokemon(null);
  const handleInput = (e) => setInputRange(e.target.value);

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 5 - Event Handling</h2>
      <p>Respond to user interactions (click, hover, input changes, etc.)</p>

      <section className="event-section">
        <header className="event-header">
          <h3>Click Event</h3>
          <p>Elige tu compañero</p>
        </header>

        <div className="event-grid">
          {clickPokemons.map((pokemon) => (
            <button
              key={pokemon.name}
              onClick={() => handleChoice(pokemon.name)}
              className="event-card choice-button"
              style={{ borderColor: typeColors[pokemon.type] || "#ccc" }}
            >
              <img src={pokemon.img} alt={pokemon.name} />
              <h4>{pokemon.name}</h4>
              <p className="pokemon-type">Type: {pokemon.type}</p>
              <p className="pokemon-power">Power: {pokemon.power}</p>
              <span className="legendary-badge">{pokemon.badge}</span>
            </button>
          ))}
        </div>

        {chosenPokemon && (
          <div className="choice-dialog">
            Elegiste: <strong>{chosenPokemon}</strong>
          </div>
        )}
      </section>

      <section className="event-section">
        <header className="event-header">
          <h3>MouseEnter / MouseLeave</h3>
          <p>Pasa el mouse para descubrir</p>
        </header>

        <div className="event-grid">
          {hoverPokemons.map((pokemon) => (
            <button
              key={pokemon.name}
              onMouseEnter={() => handleMouseEnter(pokemon.name)}
              onMouseLeave={handleMouseLeave}
              className={`event-card hover-button${
                hoveredPokemon === pokemon.name ? " active" : ""
              }`}
              style={{ borderColor: typeColors[pokemon.type] || "#ccc" }}
            >
              <img src={pokemon.img} alt={pokemon.name} />
              <h4>{pokemon.name}</h4>
              <p className="pokemon-type">Type: {pokemon.type}</p>
              <p className="pokemon-power">Power: {pokemon.power}</p>
            </button>
          ))}
        </div>

        {hoveredPokemon && (
          <div className="choice-dialog hover-dialog">
            Estás sobrevolando: <strong>{hoveredPokemon}</strong>
          </div>
        )}
      </section>

      <section className="event-section">
        <header className="event-header">
          <h3>Input Event</h3>
          <p>Mueve el slider para ajustar la potencia</p>
        </header>

        <input
          className="power-range"
          onInput={handleInput}
          type="range"
          min="0"
          max="100"
          value={inputRange}
        />

        <div className="power-output">
          <span>Power</span>
          <strong>{inputRange}</strong>
        </div>
      </section>
    </div>
  );
}

export default Example5Eventos;
