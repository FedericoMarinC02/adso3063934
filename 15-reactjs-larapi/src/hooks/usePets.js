import { useState } from "react";
import Swal from "sweetalert2";
import {
  listPetsApi,
  showPetApi,
  getPetApi,
  addPetApi,
  updatePetApi,
  deletePetApi,
} from "../api/endpoints";
import { emptyPet, extractPet, normalizePayload } from "../utils/pet";
import { getApiMessage } from "../utils/messages";
import { toast, alertError } from "./useToast";

export const usePets = ({ setView, navigate }) => {
  const [pets, setPets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [petDetail, setPetDetail] = useState(null);
  const [addForm, setAddForm] = useState(emptyPet);
  const [editForm, setEditForm] = useState(emptyPet);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const resetPetsState = () => {
    setPets([]);
    setSelectedId(null);
    setPetDetail(null);
    setAddForm(emptyPet());
    setEditForm(emptyPet());
  };

  const loadPets = async () => {
    setLoadingList(true);
    try {
      const { data } = await listPetsApi();
      let list = [];
      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data.data)) list = data.data;
      else if (Array.isArray(data.pets)) list = data.pets;
      setPets(list);
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      }
      const payload = error.response?.data;
      alertError(getApiMessage(payload, ""));
    }
    setLoadingList(false);
  };

  const openAdd = () => {
    setAddForm(emptyPet());
    setView("add");
    navigate("/pets/add");
  };

  const openShow = async (id, skipNav = false) => {
    setSelectedId(id);
    setView("show");
    if (!skipNav) navigate(`/pets/show/${id}`);
    setLoadingDetail(true);
    try {
      const { data } = await showPetApi(id);
      setPetDetail(extractPet(data));
    } catch (error) {
      const payload = error.response?.data;
      const status = error.response?.status;
      const message = getApiMessage(payload, "Mascota no encontrada");
      alertError(message);
      // Si la mascota no existe o hay error al obtenerla, regresamos al dashboard
      if (status === 404 || status === 400 || status === 405 || status == null) {
        setView("dashboard");
        navigate("/dashboard", { replace: true });
        await loadPets();
      }
    } finally {
      setLoadingDetail(false);
    }
  };

  const openEdit = async (id, skipNav = false) => {
    setSelectedId(id);
    setView("edit");
    if (!skipNav) navigate(`/pets/edit/${id}`);
    setLoadingDetail(true);
    let pet = null;

    try {
      const { data } = await showPetApi(id);
      pet = extractPet(data);
    } catch (error) {
      if (error.response?.status === 404 || error.response?.status === 405) {
        try {
          const { data } = await getPetApi(id);
          pet = extractPet(data);
        } catch (err) {
          /* ignore */
        }
      }
    }

    if (pet) {
      setEditForm({
        name: pet.name ?? "",
        kind: pet.kind ?? "",
        weight: pet.weight ?? "",
        age: pet.age ?? "",
        breed: pet.breed ?? "",
        location: pet.location ?? "",
        description: pet.description ?? "",
      });
    } else {
      const cached = pets.find((p) => String(p.id) === String(id));
      if (cached) {
        setEditForm({
          name: cached.name ?? "",
          kind: cached.kind ?? "",
          weight: cached.weight ?? "",
          age: cached.age ?? "",
          breed: cached.breed ?? "",
          location: cached.location ?? "",
          description: cached.description ?? "",
        });
      }
    }

    setLoadingDetail(false);
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    const payload = normalizePayload(addForm);
    try {
      const { data } = await addPetApi(payload);
      toast(getApiMessage(data, ""));
      setAddForm(emptyPet());
      await loadPets();
      setView("dashboard");
      navigate("/dashboard");
    } catch (error) {
      const payloadErr = error.response?.data;
      alertError(getApiMessage(payloadErr, ""));
    }
  };

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    const payload = normalizePayload(editForm);
    try {
      const { data } = await updatePetApi(selectedId, payload);
      toast(getApiMessage(data, ""));
      await loadPets();
      setView("dashboard");
      navigate("/dashboard");
    } catch (error) {
      const payloadErr = error.response?.data;
      alertError(getApiMessage(payloadErr, ""));
    }
  };

  const handleDeletePet = async (id) => {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar mascota?",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#5cb85c",
    });
    if (!confirmation.isConfirmed) return;

    try {
      const { data } = await deletePetApi(id);
      toast(getApiMessage(data, ""), "success", 1200);
      await loadPets();
      setView("dashboard");
      navigate("/dashboard");
    } catch (error) {
      const payloadErr = error.response?.data;
      alertError(getApiMessage(payloadErr, ""));
    }
  };

  const petDetailItems = [
    { label: "Nombre", value: petDetail?.name ?? "-" },
    { label: "Tipo", value: petDetail?.kind ?? "-" },
    { label: "Peso", value: petDetail?.weight ?? "-" },
    { label: "Edad", value: petDetail?.age ?? "-" },
    { label: "Raza", value: petDetail?.breed ?? "-" },
    { label: "Ubicación", value: petDetail?.location ?? "-" },
    { label: "Descripción", value: petDetail?.description ?? "-" },
  ];

  return {
    pets,
    addForm,
    editForm,
    petDetailItems,
    loadingList,
    loadingDetail,
    selectedId,
    setSelectedId,
    setAddForm,
    setEditForm,
    loadPets,
    openAdd,
    openShow,
    openEdit,
    handleAddPet,
    handleUpdatePet,
    handleDeletePet,
    resetPetsState,
  };
};
