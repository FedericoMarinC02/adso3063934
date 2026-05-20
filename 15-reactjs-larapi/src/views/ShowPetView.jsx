import btnBack from "../assets/imgs/btn-back.svg";
import paw from "../assets/imgs/huella.png";

function ShowPetView({
  loadingDetail,
  petDetailItems,
  onBack,
  onEdit,
  onDelete,
}) {
  return (
    <main id="show" className="animateView">
      <header>
        <button type="button" className="btnBack" onClick={onBack}>
          <img src={btnBack} alt="Volver" />
        </button>
        <h1 className="show-title">
          Show <span className="show-paw">🐾</span>
        </h1>
      </header>

      <div className="pet-image">
        <img src={paw} alt="Mascota" />
      </div>

      <div className="pet-details">
        {loadingDetail && <p className="helper">Cargando detalle...</p>}
        {!loadingDetail &&
          petDetailItems.map((item) => (
            <div className="detail" key={item.label}>
              <span className="label">{item.label}:</span>
              <span className="value">{item.value ?? "-"}</span>
            </div>
          ))}
      </div>

      <div className="actions">
        <button type="button" className="btnEdit" onClick={onEdit}>
          Editar
        </button>
        <button type="button" className="btnDelete" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </main>
  );
}

export default ShowPetView;
