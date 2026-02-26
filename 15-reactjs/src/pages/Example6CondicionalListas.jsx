import { useMemo, useState } from "react";
import BtnBack from "../components/BtnBack";
import CardPokemonCapture from "../components/CardPokemonCapture";

function Example6CondicionalListas() {
  // Datos base (mantenemos la estetica de Example4/5)
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
    { id: 20, name: "Groudon", type: "Ground", power: 670, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/groudon.avif" },
    { id: 21, name: "Lapras", type: "Ice", power: 535, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/lapras.avif" },
    { id: 22, name: "Scizor", type: "Steel", power: 500, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/scizor.avif" },
    { id: 23, name: "Alakazam", type: "Psychic", power: 500, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/alakazam.avif" },
    { id: 24, name: "Dragonite", type: "Dragon", power: 600, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/dragonite.avif" },
    { id: 25, name: "Garchomp", type: "Dragon", power: 600, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/garchomp.avif" },
    { id: 26, name: "Salamence", type: "Dragon", power: 600, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/salamence.avif" },
    { id: 27, name: "Tyranitar", type: "Rock", power: 600, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/tyranitar.avif" },
    { id: 28, name: "Greninja", type: "Water", power: 530, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/greninja.avif" },
    { id: 29, name: "Infernape", type: "Fire", power: 534, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/infernape.avif" },
    { id: 30, name: "Lucario", type: "Fighting", power: 525, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/lucario.avif" },
  ];

  const [typeFilter, setTypeFilter] = useState("all");
  const [minLevel, setMinLevel] = useState(1);

  const sampleRandom = (count, avoidIds = []) => {
    const sameSet = (a, b) =>
      a.length === b.length && a.every((id) => b.includes(id));

    let attempt = 0;
    let picked = [];
    do {
      picked = [...allPokemons]
        .map((p) => ({ p, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .slice(0, count)
        .map(({ p }) => ({
          ...p,
          level: Math.floor(Math.random() * 100) + 1, // nivel 1-100
        }));
      attempt += 1;
    } while (attempt < 5 && sameSet(picked.map((p) => p.id), avoidIds));

    return picked;
  };

  const [displayedPokemons, setDisplayedPokemons] = useState(() =>
    sampleRandom(8)
  );

  const types = useMemo(
    () => ["all", ...new Set(allPokemons.map((p) => p.type))],
    []
  );

  const shufflePokemons = () => {
    setDisplayedPokemons((prev) => sampleRandom(8, prev.map((p) => p.id)));
  };

  const resetFilters = () => {
    setTypeFilter("all");
    setMinLevel(1);
    setDisplayedPokemons((prev) => sampleRandom(8, prev.map((p) => p.id)));
  };

  const filtered = displayedPokemons.filter(
    (p) =>
      (typeFilter === "all" || p.type === typeFilter) &&
      p.level >= Number(minLevel)
  );

  const controlsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "8px",
    alignItems: "stretch",
    margin: "16px 0",
  };

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 6: Condicional & Listas</h2>
      <p>Filtra pokemones por tipo y nivel, o genera un set aleatorio.</p>

      <section className="event-section">
        <header className="event-header">
          <h3>Filtros</h3>
          <p>Combina tipo y poder. Usa el boton aleatorio para reordenar.</p>
          <p style={{ marginTop: "4px" }}>Se muestran 8 tarjetas al tiempo.</p>
        </header>

        <div style={controlsStyle}>
          <div className="event-card" style={{ cursor: "default", minHeight: "90px", padding: "8px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
              <span>Tipo</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{ padding: "8px", borderRadius: "6px" }}
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t === "all" ? "Todos" : t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="event-card" style={{ cursor: "default", minHeight: "90px", padding: "8px" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
              <span>Nivel mínimo: {minLevel}</span>
              <input
                type="range"
                min="1"
                max="90"
                step="1"
                value={minLevel}
                onInput={(e) => setMinLevel(e.target.value)}
                className="power-range"
              />
            </label>
          </div>

          <button
            className="event-card"
            style={{ width: "100%", minHeight: "90px", padding: "8px", fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={shufflePokemons}
            title="Toma 8 pokemones al azar (sin repetir)"
          >
            Generar aleatorio (8)
          </button>

          <button
            className="event-card hover-button"
            style={{ width: "100%", minHeight: "90px", padding: "8px", fontSize: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </section>

      <section className="event-section">
        <header className="event-header">
          <h3>Resultados ({filtered.length} de 8)</h3>
          <p>Tarjetas con el mismo estilo de Example4/5. Filtra o regenera.</p>
        </header>

        <div className="event-grid">
          {filtered.map((pokemon) => (
            <CardPokemonCapture
              key={pokemon.id}
              name={pokemon.name}
              type={pokemon.type}
              power={pokemon.power}
              level={pokemon.level}
              legendary={pokemon.legendary}
              image={pokemon.img}
              isCaptured={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Example6CondicionalListas;
