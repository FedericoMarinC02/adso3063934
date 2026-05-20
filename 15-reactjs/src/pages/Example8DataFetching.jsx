import { useEffect, useMemo, useState } from "react";
import BtnBack from "../components/BtnBack";
import "./Example8DataFetching.css";

const PAGE_SIZE = 60;
const LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const TYPES = [
  "all","normal","fire","water","electric","grass","ice","fighting","poison","ground","flying",
  "psychic","bug","rock","ghost","dragon","dark","steel","fairy"
];
const PSEUDO_SET = new Set([
  "dragonite","tyranitar","salamence","metagross","garchomp",
  "hydreigon","goodra","kommo-o","dragapult","baxcalibur"
]);

const getSpriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const extractId = (url) => {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? match[1] : null;
};

const getAnimatedSprite = (detail, id) =>
  detail?.sprites?.other?.showdown?.front_default ||
  detail?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
  detail?.sprites?.front_default ||
  getSpriteUrl(id);

function Example8DataFetching() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loadingList, setLoadingList] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [typeSet, setTypeSet] = useState(null);
  const [loadingType, setLoadingType] = useState(false);
  const [legendFilter, setLegendFilter] = useState("all"); // all | legendary | pseudo
  const [speciesCache, setSpeciesCache] = useState(new Map()); // name -> { isLegendary }
  const [evoName, setEvoName] = useState("");
  const [evoSet, setEvoSet] = useState(null);
  const [loadingEvo, setLoadingEvo] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [showAllMoves, setShowAllMoves] = useState(false);
  const [tab, setTab] = useState("info");

  useEffect(() => {
    async function loadList() {
      try {
        const res = await fetch(LIST_URL);
        const data = await res.json();
        setPokemons(data.results || []);
      } catch (err) {
        console.error("Error cargando lista", err);
      } finally {
        setLoadingList(false);
      }
    }
    loadList();
  }, []);

  const handleOpen = async (id, url) => {
    setSelectedId(id);
    setLoadingDetail(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setDetail(data);
    } catch (err) {
      console.error("Error cargando detalle", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleClose = () => {
    setSelectedId(null);
    setDetail(null);
    setShowAllMoves(false);
    setTab("info");
  };

  // Cargar pokemones de un tipo cuando se selecciona
  useEffect(() => {
    if (typeFilter === "all") {
      setTypeSet(null);
      return;
    }
    let cancelled = false;
    async function loadType() {
      setLoadingType(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${typeFilter}`);
        const data = await res.json();
        const names = data.pokemon?.map((p) => p.pokemon?.name) || [];
        if (!cancelled) setTypeSet(new Set(names));
      } catch (err) {
        console.error("Error cargando tipo", err);
        if (!cancelled) setTypeSet(null);
      } finally {
        if (!cancelled) setLoadingType(false);
      }
    }
    loadType();
    return () => {
      cancelled = true;
    };
  }, [typeFilter]);

  // Pre-filtro por texto, tipo y evolucion (no requiere species info)
  const preLegendFiltered = useMemo(() => {
    return pokemons.filter((p) => {
      const matchesText = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = !typeSet || typeSet.has(p.name);
      const matchesEvo = !evoSet || evoSet.has(p.name);
      return matchesText && matchesType && matchesEvo;
    });
  }, [pokemons, search, typeSet, evoSet]);

  const filtered = useMemo(() => {
    if (legendFilter === "legendary") {
      return preLegendFiltered.filter((p) => speciesCache.get(p.name)?.isLegendary === true);
    }
    if (legendFilter === "pseudo") {
      return preLegendFiltered.filter((p) => PSEUDO_SET.has(p.name.toLowerCase()));
    }
    return preLegendFiltered;
  }, [preLegendFiltered, legendFilter, speciesCache]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageSlice = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage]
  );

  const goToPage = (next) => setPage(Math.min(Math.max(next, 1), totalPages));

  // Pre-cargar species para saber si son legendarios (limite 800 para no saturar)
  useEffect(() => {
    if (legendFilter !== "legendary") return;
    const toCheck = preLegendFiltered.slice(0, 800).map((p) => p.name).filter((n) => !speciesCache.has(n));
    if (!toCheck.length) return;
    let cancelled = false;
    (async () => {
      const updates = new Map();
      for (const name of toCheck) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
          const data = await res.json();
          updates.set(name, { isLegendary: Boolean(data.is_legendary || data.is_mythical) });
        } catch (err) {
          console.error("species fetch failed", name, err);
        }
      }
      if (cancelled || updates.size === 0) return;
      setSpeciesCache((prev) => {
        const next = new Map(prev);
        updates.forEach((v, k) => next.set(k, v));
        return next;
      });
    })();
    return () => { cancelled = true; };
  }, [legendFilter, preLegendFiltered, speciesCache]);

  // Asegurar datos de especie para la pagina visible (legendary)
  useEffect(() => {
    if (legendFilter !== "legendary") return;
    const toCheck = pageSlice.map((p) => p.name).filter((n) => !speciesCache.has(n));
    if (!toCheck.length) return;
    let cancelled = false;
    (async () => {
      const updates = new Map();
      for (const name of toCheck) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
          const data = await res.json();
          updates.set(name, { isLegendary: Boolean(data.is_legendary || data.is_mythical) });
        } catch (err) {
          console.error("species page fetch failed", name, err);
        }
      }
      if (cancelled || updates.size === 0) return;
      setSpeciesCache((prev) => {
        const next = new Map(prev);
        updates.forEach((v, k) => next.set(k, v));
        return next;
      });
    })();
    return () => { cancelled = true; };
  }, [legendFilter, pageSlice, speciesCache]);

  // Cargar cadena evolutiva
  useEffect(() => {
    if (!evoName) {
      setEvoSet(null);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoadingEvo(true);
      setEvoSet(null);
      try {
        const resSpec = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${evoName.toLowerCase()}`);
        const spec = await resSpec.json();
        const evoUrl = spec.evolution_chain?.url;
        if (!evoUrl) throw new Error("sin cadena");
        const resEvo = await fetch(evoUrl);
        const evoData = await resEvo.json();
        const names = [];
        const walk = (node) => {
          if (!node) return;
          if (node.species?.name) names.push(node.species.name);
          node.evolves_to?.forEach(walk);
        };
        walk(evoData.chain);
        if (!cancelled) setEvoSet(new Set(names));
      } catch (err) {
        console.error("Error cargando evoluciones", err);
        if (!cancelled) setEvoSet(null);
      } finally {
        if (!cancelled) setLoadingEvo(false);
      }
    })();
    return () => { cancelled = true; };
  }, [evoName]);

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 8: Data Fetching (PokeAPI)</h2>
      <p className="subtitle">
        Se listan todos los pokemones de PokeAPI (hasta el limite actual). Click en cualquier tarjeta para ver
        la informacion completa con sprite animado cuando este disponible.
      </p>

      <div className="toolbar">
        <input
          className="search"
          type="search"
          placeholder="Buscar pokemon por nombre..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="select"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          className="select"
          value={legendFilter}
          onChange={(e) => {
            setLegendFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">all</option>
          <option value="legendary">legendary</option>
          <option value="pseudo">pseudo-legendary</option>
        </select>
        <div className="pager">
          <button onClick={() => goToPage(1)} disabled={safePage === 1}>{"<<"}</button>
          <button onClick={() => goToPage(safePage - 1)} disabled={safePage === 1}>Anterior</button>
          <span>
            Pag {safePage} / {totalPages} ({filtered.length} resultados
            {loadingType ? " · filtrando..." : ""}
            {loadingEvo ? " · evoluciones..." : ""}
            {legendFilter === "legendary" ? " · solo legendarios" : ""}
            {legendFilter === "pseudo" ? " · pseudo-legendarios" : ""}
            )
          </span>
          <button onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages}>Siguiente</button>
          <button onClick={() => goToPage(totalPages)} disabled={safePage === totalPages}>{">>"}</button>
        </div>
        <div className="evo-box">
          <input
            className="search"
            style={{ minWidth: "180px" }}
            placeholder="Filtrar por evolucion (ej: garchomp)"
            value={evoName}
            onChange={(e) => {
              setEvoName(e.target.value.trim());
              setPage(1);
            }}
          />
          <button className="toggle" onClick={() => { setEvoName(""); setEvoSet(null); }}>
            Limpiar evo
          </button>
        </div>
      </div>

      {loadingList ? (
        <div className="loader">Cargando PokeAPI...</div>
      ) : (
        <>
          <div className="poke-grid">
            {pageSlice.map((p) => {
              const id = extractId(p.url);
              return (
                <button
                  key={p.name}
                  className="poke-card"
                  onClick={() => handleOpen(id, p.url)}
                  title="Ver detalle"
                >
                  <span className="poke-id">#{id}</span>
                  <img src={getSpriteUrl(id)} alt={p.name} loading="lazy" />
                  <strong>{p.name}</strong>
                  <span className="hint">Click para ver todo</span>
                </button>
              );
            })}
          </div>

          <div className="actions">
            <button onClick={() => goToPage(safePage - 1)} disabled={safePage === 1} className="load-more">
              Anterior
            </button>
            <button onClick={() => goToPage(safePage + 1)} disabled={safePage === totalPages} className="load-more">
              Siguiente
            </button>
          </div>
        </>
      )}

      {selectedId && (
        <div className="modal-backdrop" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <div>
                <p className="tag">#{selectedId}</p>
                <h3>{detail?.name || "Cargando..."}</h3>
              </div>
              <button className="close-btn" onClick={handleClose}>
                Cerrar
              </button>
            </header>

            {loadingDetail && <div className="loader">Descargando detalle...</div>}

            {detail && (
              <div className="detail">
                <div className="tabs">
                  <button className={`tab ${tab === "info" ? "active" : ""}`} onClick={() => setTab("info")}>Info</button>
                  <button className={`tab ${tab === "stats" ? "active" : ""}`} onClick={() => setTab("stats")}>Stats</button>
                  <button className={`tab ${tab === "moves" ? "active" : ""}`} onClick={() => setTab("moves")}>Movs</button>
                </div>

                {tab === "info" && (
                  <div className="detail-grid-2">
                    <div className="detail-hero panel">
                      <div className="hero-top">
                        <div className="chips">
                          {detail.types?.map((t) => (
                            <span key={t.type.name} className={`chip chip-${t.type.name}`}>
                              {t.type.name}
                            </span>
                          ))}
                        </div>
                        <p className="tag">ID: {selectedId}</p>
                      </div>
                      <img
                        src={getAnimatedSprite(detail, selectedId)}
                        alt={detail.name}
                      />
                      <div className="hero-meta">
                        <span>Altura: {detail.height / 10} m</span>
                        <span>Peso: {detail.weight / 10} kg</span>
                        <span>Base XP: {detail.base_experience}</span>
                      </div>
                    </div>

                    <section className="panel">
                      <h4>Habilidades</h4>
                      <div className="pill-box">
                        {detail.abilities?.map((a) => (
                          <span key={a.ability.name} className="pill">
                            {a.ability.name} {a.is_hidden ? "(hidden)" : ""}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {tab === "stats" && (
                  <section className="panel">
                    <h4>Stats</h4>
                    <ul className="stat-list">
                      {detail.stats?.map((s) => (
                        <li key={s.stat.name}>
                          <span>{s.stat.name}</span>
                          <div className="stat-bar">
                            <div
                              className="stat-fill"
                              style={{ width: `${Math.min(100, s.base_stat)}%` }}
                            />
                          </div>
                          <strong>{s.base_stat}</strong>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {tab === "moves" && (
                  <section className="panel wide">
                    <h4>Movimientos ({detail.moves?.length})</h4>
                    <div className="scroll-box">
                      {(showAllMoves ? detail.moves : detail.moves?.slice(0, 50))?.map((m) => (
                        <span key={m.move.name} className="pill ghost">
                          {m.move.name}
                        </span>
                      ))}
                    </div>
                    {detail.moves?.length > 50 && (
                      <button
                        className="toggle"
                        onClick={() => setShowAllMoves((v) => !v)}
                      >
                        {showAllMoves ? "Ver menos" : `Ver todos (${detail.moves.length})`}
                      </button>
                    )}
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Example8DataFetching;



