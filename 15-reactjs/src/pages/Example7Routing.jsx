import { Routes, Route, Link, useLocation, useSearchParams } from "react-router-dom";
import BtnBack from "../components/BtnBack";
import CardPokemonCapture from "../components/CardPokemonCapture";
import "./Example7Routing.css";

const pokedex = [
  // Starters y clasicos
  { id: 25, name: "Pikachu", type: "Electric", power: 320, level: 18, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/pikachu.avif", desc: "Companero electrico y veloz; usa chispas para desgastar y puede rematar con Volt Tackle cuando el rival esta debilitado." },
  { id: 4, name: "Charmander", type: "Fire", power: 309, level: 15, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charmander.avif", desc: "Pequeno pero ardiente; su flama de cola marca su energia. Con garras y fuego presiona desde temprano y escala fuerte al evolucionar." },
  { id: 7, name: "Squirtle", type: "Water", power: 314, level: 14, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/squirtle.avif", desc: "Caparazon solido, buen control defensivo y contraataques acuaticos. Puede retroceder y seguir golpeando sin ceder terreno." },
  { id: 1, name: "Bulbasaur", type: "Grass", power: 318, level: 13, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/bulbasaur.avif", desc: "Balance entre dano y soporte: drenadoras, somnifero y latigo cepa para drenar al rival mientras aguanta." },
  { id: 133, name: "Eevee", type: "Normal", power: 325, level: 16, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/eevee.avif", desc: "Versatil por naturaleza; puede especializarse en ataque, defensa o soporte segun la evolucion que elijas." },
  { id: 39, name: "Jigglypuff", type: "Fairy", power: 270, level: 12, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/jigglypuff.avif", desc: "Canta y duerme rivales, luego pega con vozarron de hada. Ideal para control y remate seguro." },
  { id: 94, name: "Gengar", type: "Ghost", power: 500, level: 42, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/gengar.avif", desc: "Trickster spectral rapidisimo; combina hipnosis, maldiciones y special attack altisimo para barrer equipos." },
  { id: 143, name: "Snorlax", type: "Normal", power: 540, level: 48, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/snorlax.avif", desc: "Pared viviente que absorbe golpes y responde con fuerza bruta; excelente en peleas largas." },
  { id: 448, name: "Lucario", type: "Fighting", power: 525, level: 50, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/lucario.avif", desc: "Ofensiva mixta con prioridad; Aura Sphere y Extreme Speed le permiten finalizar objetivos clave." },
  { id: 149, name: "Dragonite", type: "Dragon", power: 600, level: 55, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/dragonite.avif", desc: "Dragon todoterreno, gran bulk y cobertura; puede danzar y barrer o jugar defensivo." },
  { id: 6, name: "Charizard", type: "Fire", power: 534, level: 50, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charizard.avif", desc: "Atacante especial de fuego con movilidad aerea; con sequia o danzas puede volverse temible." },
  { id: 131, name: "Lapras", type: "Water", power: 535, level: 45, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/lapras.avif", desc: "Soporte acorazado de agua/hielo; aguanta, congela y transporta a todo el equipo." },
  { id: 18, name: "Pidgeot", type: "Flying", power: 479, level: 40, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/pidgeot.avif", desc: "Control aereo y velocidad alta; con vendaval y precision mejorada presiona sin parar." },
  { id: 212, name: "Scizor", type: "Steel", power: 500, level: 47, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/scizor.avif", desc: "Acero-bicho con prioridad (Bullet Punch) y resistencia; entra, presiona y pivot." },
  { id: 681, name: "Aegislash", type: "Steel", power: 520, level: 52, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/aegislash.avif", desc: "Alterna entre escudo y espada; tanque y atacante en una sola pieza, muy versatil." },
  { id: 257, name: "Blaziken", type: "Fire", power: 530, level: 52, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/blaziken.avif", desc: "Atacante fisico de fuego/lucha con velocidad creciente; perfecto para barridas tardias." },
  { id: 245, name: "Suicune", type: "Water", power: 580, level: 55, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/suicune.avif", desc: "Legendario tanque de agua; calma mentes, recupera vida y desgasta al rival." },
  { id: 382, name: "Kyogre", type: "Water", power: 670, level: 60, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/kyogre.avif", desc: "Invoca lluvia y dispara ataques especiales devastadores; domina el clima." },
  { id: 384, name: "Rayquaza", type: "Dragon", power: 680, level: 65, legendary: true, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/rayquaza.avif", desc: "Dragon volador supremo; rompe climas y golpea con cobertura total." },
  // Linea Garchomp completa
  { id: 443, name: "Gible", type: "Dragon", power: 300, level: 16, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/gible.avif", desc: "Dragon tiburon terrenado; comienza fragil pero promete enorme ofensiva." },
  { id: 444, name: "Gabite", type: "Dragon", power: 410, level: 32, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/gabite.avif", desc: "Intermedio rapido; usa tierra/dragon para castigar antes de evolucionar." },
  { id: 445, name: "Garchomp", type: "Dragon", power: 600, level: 55, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/garchomp.avif", desc: "Pseudolegendario velocista y fisico; terremotos y colmillos lo hacen letal." },
  { id: 10045, name: "Mega Garchomp", type: "Dragon", power: 700, level: 60, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/garchomp-mega.avif", desc: "Forma mega: sacrifica velocidad por ataque brutal y presencia intimidante." },
  // Extras variados
  { id: 197, name: "Umbreon", type: "Dark", power: 525, level: 48, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/umbreon.avif", desc: "Muralla especial con curacion y jugadas de desgaste; excelente soporte." },
  { id: 700, name: "Sylveon", type: "Fairy", power: 525, level: 48, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/sylveon.avif", desc: "Hada que brilla contra dragones; vozarron y deseo para soporte ofensivo." },
  { id: 248, name: "Tyranitar", type: "Rock", power: 600, level: 55, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/tyranitar.avif", desc: "Crea tormenta de arena, aguanta y pega con colmillos y rocas." },
  { id: 3821, name: "Greninja", type: "Water", power: 530, level: 52, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/greninja.avif", desc: "Ninja acuatico con protean; cambia de tipo y sorprende con prioridad." },
  { id: 282, name: "Gardevoir", type: "Psychic", power: 518, level: 45, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/gardevoir.avif", desc: "Soporte psiquico/hada que protege aliados y golpea con brillo magico." },
  { id: 303, name: "Mawile", type: "Steel", power: 380, level: 30, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/mawile.avif", desc: "Trampas, intimidacion y colmillos de acero/hada para castigar cambios." },
  { id: 6001, name: "Charizard X", type: "Dragon", power: 634, level: 60, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charizard-mega-x.avif", desc: "Mega X cambia a dragon/fuego con ataque fisico enorme y look oscuro." },
  { id: 6002, name: "Charizard Y", type: "Fire", power: 634, level: 60, legendary: false, img: "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/charizard-mega-y.avif", desc: "Mega Y potencia sequia y dispara llamas devastadoras con alta velocidad." },
];

const typeEffects = {
  Fire: { borderColor: "#f94332", boxShadow: "0 0 22px rgba(249,67,50,0.4)", background: "linear-gradient(135deg, rgba(249,67,50,0.25), rgba(60,16,7,0.55))", "--tint": "#f94332" },
  Water: { borderColor: "#1E90FF", boxShadow: "0 0 22px rgba(30,144,255,0.4)", background: "linear-gradient(135deg, rgba(30,144,255,0.22), rgba(10,28,50,0.55))", "--tint": "#1E90FF" },
  Electric: { borderColor: "#FFD700", boxShadow: "0 0 22px rgba(255,215,0,0.45)", background: "linear-gradient(135deg, rgba(255,215,0,0.28), rgba(60,50,0,0.55))", "--tint": "#FFD700" },
  Grass: { borderColor: "#32CD32", boxShadow: "0 0 22px rgba(50,205,50,0.4)", background: "linear-gradient(135deg, rgba(50,205,50,0.22), rgba(12,40,18,0.55))", "--tint": "#32CD32" },
  Dragon: { borderColor: "#FF4500", boxShadow: "0 0 24px rgba(255,69,0,0.45)", background: "linear-gradient(135deg, rgba(255,69,0,0.22), rgba(20,8,4,0.65))", "--tint": "#FF4500" },
  Psychic: { borderColor: "#FF69B4", boxShadow: "0 0 22px rgba(255,105,180,0.45)", background: "linear-gradient(135deg, rgba(255,105,180,0.26), rgba(60,20,60,0.55))", "--tint": "#FF69B4" },
  Ghost: { borderColor: "#6A0DAD", boxShadow: "0 0 22px rgba(106,13,173,0.4)", background: "linear-gradient(135deg, rgba(106,13,173,0.24), rgba(20,10,40,0.6))", "--tint": "#6A0DAD" },
  Dark: { borderColor: "#696969", boxShadow: "0 0 20px rgba(105,105,105,0.4)", background: "linear-gradient(135deg, rgba(60,60,60,0.45), rgba(10,10,10,0.7))", "--tint": "#696969" },
  Steel: { borderColor: "#C0C0C0", boxShadow: "0 0 20px rgba(192,192,192,0.4)", background: "linear-gradient(135deg, rgba(192,192,192,0.3), rgba(30,30,30,0.55))", "--tint": "#C0C0C0" },
  Fairy: { borderColor: "#FFB6C1", boxShadow: "0 0 22px rgba(255,182,193,0.45)", background: "linear-gradient(135deg, rgba(255,182,193,0.3), rgba(80,30,60,0.5))", "--tint": "#FFB6C1" },
  Rock: { borderColor: "#A9A9A9", boxShadow: "0 0 18px rgba(169,169,169,0.35)", background: "linear-gradient(135deg, rgba(169,169,169,0.26), rgba(40,30,20,0.55))", "--tint": "#A9A9A9" },
  Fighting: { borderColor: "#8B4513", boxShadow: "0 0 22px rgba(139,69,19,0.4)", background: "linear-gradient(135deg, rgba(139,69,19,0.28), rgba(35,15,5,0.6))", "--tint": "#8B4513" },
  Flying: { borderColor: "#ADD8E6", boxShadow: "0 0 18px rgba(173,216,230,0.35)", background: "linear-gradient(135deg, rgba(173,216,230,0.28), rgba(20,30,50,0.5))", "--tint": "#ADD8E6" },
  Normal: { borderColor: "#8a8a8a", boxShadow: "0 0 16px rgba(138,138,138,0.35)", background: "linear-gradient(135deg, rgba(138,138,138,0.24), rgba(25,25,25,0.45))", "--tint": "#8a8a8a" },
  Bug: { borderColor: "#90EE90", boxShadow: "0 0 18px rgba(144,238,144,0.35)", background: "linear-gradient(135deg, rgba(144,238,144,0.24), rgba(20,40,20,0.5))", "--tint": "#90EE90" },
  Ice: { borderColor: "#87CEEB", boxShadow: "0 0 18px rgba(135,206,235,0.35)", background: "linear-gradient(135deg, rgba(135,206,235,0.26), rgba(20,40,60,0.5))", "--tint": "#87CEEB" },
};

function GeneralInfo() {
  return (
    <section className="route-card">
      <h3>Bienvenido al PokeHub</h3>
      <p>Explora la Pokedex con rutas anidadas: Home da contexto, List muestra tarjetas y Details profundiza.</p>
      <div className="route-highlight">
        <strong>Tip:</strong> Usa los botones para navegar sin recargar. Haz click en la lista para ir directo al detalle.
      </div>
    </section>
  );
}

function PokemonList() {
  return (
    <section className="route-card">
      <h3>Lista de pokemons</h3>
      <p>Haz click en cualquier tarjeta para abrir su detalle en /example7/details?name=...</p>
      <div className="event-grid">
        {pokedex.map((p) => (
          <Link
            key={p.id}
            to={`/example7/details?name=${p.name.toLowerCase()}`}
            className="card-link"
          >
            <CardPokemonCapture
              name={p.name}
              type={p.type}
              power={p.power}
              level={p.level}
              legendary={p.legendary}
              image={p.img}
              isCaptured={false}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

function PokemonDetails() {
  const [search] = useSearchParams();
  const name = search.get("name");
  const filtered = name
    ? pokedex.filter((p) => p.name.toLowerCase() === name.toLowerCase())
    : pokedex;

  return (
    <section className="route-card">
      <h3>Detalles de Pokemons</h3>
      <p>{name ? `Detalle para ${filtered[0]?.name || "el pokemon indicado"}.` : "Se muestran todos con efectos por tipo."}</p>
      <div className="detail-layout">
        {filtered.map((pokemon) => (
          <div
            key={pokemon.id}
            className="detail-item"
            style={typeEffects[pokemon.type] || {}}
          >
            <CardPokemonCapture
              name={pokemon.name}
              type={pokemon.type}
              power={pokemon.power}
              level={pokemon.level}
              legendary={pokemon.legendary}
              image={pokemon.img}
              isCaptured={false}
            />
            <p className="detail-desc">{pokemon.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InternalNavigation() {
  const location = useLocation();
  const isActive = (path) =>
    path === "/example7"
      ? location.pathname === "/example7"
      : location.pathname.startsWith(path);

  return (
    <nav className="routing-nav">
      <Link className={`nav-pill ${isActive("/example7") ? "active" : ""}`} to="/example7">
        Home
      </Link>
      <Link className={`nav-pill ${isActive("/example7/list") ? "active" : ""}`} to="/example7/list">
        List
      </Link>
      <Link
        className={`nav-pill ${isActive("/example7/details") ? "active" : ""}`}
        to="/example7/details?name=pikachu"
      >
        Details
      </Link>
    </nav>
  );
}

function Example7Routing() {
  return (
    <div className="container">
      <BtnBack />
      <h2>Example 7: React Router</h2>
      <p className="routing-subtitle">Navega entre rutas hijas sin recargar el navegador.</p>

      <InternalNavigation />

      <Routes>
        <Route index element={<GeneralInfo />} />
        <Route path="list" element={<PokemonList />} />
        <Route path="details" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default Example7Routing;
