import titleAdd from "../assets/imgs/title-add.svg";
import btnBack from "../assets/imgs/btn-back.svg";

function AddPetView({ addForm, onChange, onSubmit, onCancel }) {
  return (
    <main id="add" className="animateView">
      <header>
        <button type="button" className="btnBack" onClick={onCancel}>
          <img src={btnBack} alt="Volver" />
        </button>
        <img src={titleAdd} alt="Add pet" />
      </header>

      <form id="addForm" onSubmit={onSubmit}>
        <label>
          Nombre:
          <input
            id="addName"
            value={addForm.name}
            onChange={(e) => onChange({ ...addForm, name: e.target.value })}
            required
          />
        </label>
        <label>
          Tipo:
          <input
            id="addKind"
            value={addForm.kind}
            onChange={(e) => onChange({ ...addForm, kind: e.target.value })}
            required
          />
        </label>
        <label>
          Peso:
          <input
            id="addWeight"
            type="number"
            value={addForm.weight}
            onChange={(e) => onChange({ ...addForm, weight: e.target.value })}
          />
        </label>
        <label>
          Edad:
          <input
            id="addAge"
            type="number"
            value={addForm.age}
            onChange={(e) => onChange({ ...addForm, age: e.target.value })}
          />
        </label>
        <label>
          Raza:
          <input
            id="addBreed"
            value={addForm.breed}
            onChange={(e) => onChange({ ...addForm, breed: e.target.value })}
          />
        </label>
        <label>
          Ubicación:
          <input
            id="addLocation"
            value={addForm.location}
            onChange={(e) =>
              onChange({ ...addForm, location: e.target.value })
            }
          />
        </label>
        <label>
          Descripción:
          <textarea
            id="addDescription"
            value={addForm.description}
            onChange={(e) =>
              onChange({ ...addForm, description: e.target.value })
            }
          />
        </label>

        <div className="actions">
          <button type="submit" className="btnAddPet">
            Agregar
          </button>
          <button type="button" className="btnCancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddPetView;
