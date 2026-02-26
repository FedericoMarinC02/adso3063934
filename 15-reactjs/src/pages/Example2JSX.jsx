import BtnBack from "../components/BtnBack";

function Example2JSX() {

    const pkName = "Gengar";
    const pkType = "Ghost";
    const pkLevel = 25;
    const pkHability = ['Levitate', 'Cursed Body'];
    const pkImg = "https://img.pokemondb.net/sprites/scarlet-violet/icon/avif/gengar.avif";

    const styles = {
  container: {
    width: '270px',
    padding: '1.6rem',
    borderRadius: '16px',
    background: 'linear-gradient(145deg, #3E3A64, #643A4B)',
    border: '3px solid #533A64',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
    color: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
  },

  title: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    letterSpacing: '1px',
    color: '#008763',
    
  },

  info: {
    fontSize: '0.95rem',
    opacity: 0.9,
    marginBottom: '0.3rem'
  },

  image: {
    width: '120px',
    marginTop: '1rem'
  }
};


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 2: JSX</h2>
            <p>Writing HTML-Like code within JavaScript using curly braces for JS expresions.</p>
            <div style={styles.container}>
            {pkName && <h3 style={styles.title}>{pkName}</h3>}
            {pkType && <p style={styles.info}>Type: {pkType}</p>}
            {pkLevel && <p style={styles.info}>Level: {pkLevel}</p>}
            {pkHability && <p style={styles.info}>Hability: {pkHability.join(', ')}</p>}
            {pkImg && <img src={pkImg} alt={pkName} style={styles.image} />}
            <p>Is it a starter? {pkLevel === 25 ? "No ✖️" : " Yes ✔️"}</p>
            </div>
        </div>
    );
}

export default Example2JSX;