import btnBack from "../assets/imgs/btn-back.svg";

function EditPetView({ editForm, onChange, onSubmit, onCancel }) {
  return (
    <main id="edit" className="animateView">
      <header>
        <button type="button" className="btnBack" onClick={onCancel}>
          <img src={btnBack} alt="Volver" />
        </button>
        <h1 className="form-title">
          Edit <span className="form-icon">✎</span>
        </h1>
      </header>

      <form id="editForm" onSubmit={onSubmit}>
        <label>
          Nombre:
          <input
            id="editName"
            value={editForm.name}
            onChange={(e) => onChange({ ...editForm, name: e.target.value })}
            required
          />
        </label>
        <label>
          Tipo:
          <input
            id="editKind"
            value={editForm.kind}
            onChange={(e) => onChange({ ...editForm, kind: e.target.value })}
            required
          />
        </label>
        <label>
          Peso:
          <input
            id="editWeight"
            type="number"
            value={editForm.weight}
            onChange={(e) => onChange({ ...editForm, weight: e.target.value })}
          />
        </label>
        <label>
          Edad:
          <input
            id="editAge"
            type="number"
            value={editForm.age}
            onChange={(e) => onChange({ ...editForm, age: e.target.value })}
          />
        </label>
        <label>
          Raza:
          <input
            id="editBreed"
            value={editForm.breed}
            onChange={(e) => onChange({ ...editForm, breed: e.target.value })}
          />
        </label>
        <label>
          Ubicación:
          <input
            id="editLocation"
            value={editForm.location}
            onChange={(e) =>
              onChange({ ...editForm, location: e.target.value })
            }
          />
        </label>
        <label>
          Descripción:
          <textarea
            id="editDescription"
            value={editForm.description}
            onChange={(e) =>
              onChange({ ...editForm, description: e.target.value })
            }
          />
        </label>

        <div className="actions">
          <button type="submit" className="btnUpdatePet">
            Actualizar
          </button>
          <button type="button" className="btnCancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditPetView;
