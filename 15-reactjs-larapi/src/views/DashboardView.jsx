import titleDashboard from "../assets/imgs/Title-dashboard.png";
import pet01 from "../assets/imgs/pet01.png";

function DashboardView({
  loadingList,
  pets,
  openAdd,
  handleLogout,
  openShow,
  openEdit,
  handleDeletePet,
}) {
  return (
    <main id="dashboard" className="animateView">
      <header>
        <img src={titleDashboard} alt="Dashboard" />
      </header>

      <nav>
        <button
          type="button"
          className="btnAdd"
          onClick={openAdd}
          aria-label="Agregar mascota"
        >
          <span>Agregar</span>
        </button>
        <button
          type="button"
          className="btnLogout"
          onClick={() => handleLogout()}
          aria-label="Cerrar sesión"
        >
          <span>Logout</span>
        </button>
      </nav>

      <h2>Pet list</h2>
      <section className="list">
        {loadingList && <p className="helper">Cargando mascotas...</p>}
        {!loadingList && pets.length === 0 && (
          <p className="helper">No hay mascotas registradas</p>
        )}
        {!loadingList &&
          pets.map((pet) => (
            <div className="row" key={pet.id} data-pet-id={pet.id}>
              <img src={pet01} alt={pet.name || "Pet"} />
              <div className="data">
                <h3>{pet.name || "Sin nombre"}</h3>
                <h4>
                  {pet.kind || "Tipo"}: {pet.breed || "Raza"}
                </h4>
              </div>
              <nav className="actions">
                <button
                  type="button"
                  className="btnShow"
                  title="Ver"
                  onClick={() => openShow(pet.id)}
                >
                  <span className="sr-only">Ver</span>
                </button>
                <button
                  type="button"
                  className="btnEdit"
                  title="Editar"
                  onClick={() => openEdit(pet.id)}
                >
                  <span className="sr-only">Editar</span>
                </button>
                <button
                  type="button"
                  className="btnDelete"
                  title="Eliminar"
                  onClick={() => handleDeletePet(pet.id)}
                >
                  <span className="sr-only">Eliminar</span>
                </button>
              </nav>
            </div>
          ))}
      </section>
    </main>
  );
}

export default DashboardView;
