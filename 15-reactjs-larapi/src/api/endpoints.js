import { json, request } from "./client";

export const loginApi = (credentials) => json("POST", "/login", credentials);
export const listPetsApi = () => request("/pets/list", { method: "GET" });
export const showPetApi = (id) => request(`/pets/show/${id}`, { method: "GET" });
export const getPetApi = (id) => request(`/pets/${id}`, { method: "GET" });
export const addPetApi = (payload) => json("POST", "/pets/store", payload);
export const updatePetApi = (id, payload) =>
  json("PUT", `/pets/edit/${id}`, payload);
export const deletePetApi = (id) =>
  request(`/pets/delete/${id}`, { method: "DELETE" });
export const logoutApi = () => request("/logout", { method: "POST" });
