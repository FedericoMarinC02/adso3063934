import BtnBack from "../components/BtnBack";


//Component Charmander
function Haunter() {
    return (
        <div style={{border: '4px solid black', padding: '1.4rem', borderRadius: '0.3rem', background: '#4c0579ef', width: '200px'}}>
            <h3>👻 haunter</h3>
            <p>Type: Ghost</p>
            <img src="https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/haunter.avif" alt="Haunter" />
        </div>
    )
}

function Dragapult() {
    return (
        <div style={{border: '4px solid green', padding: '1.4rem', borderRadius: '0.3rem', background: '#33be92ef', width: '200px'}}>
            <h3>🐉 Dragapult</h3>
            <p>Type: Dragon</p>
            <img src="https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/dragapult.avif" alt="Dragapult" />
        </div>
    )
}

function Arceus() {
    return (
        <div style={{border: '4px solid yellow', padding: '1.4rem', borderRadius: '0.3rem', background: '#e7eac0ef', width: '200px'}}>
            <h3>🐉 Arceus</h3>
            <p>Type: Normal</p>
            <img src="https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/arceus.avif" alt="Arceus" />
        </div>
    )
}

function Example1Components() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>
            <p>Create independent a reusabele UI pieces</p>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem'}}>
                <Haunter />
                <Dragapult />
                <Arceus />
            </div>
        </div>
    );
}

export default Example1Components;