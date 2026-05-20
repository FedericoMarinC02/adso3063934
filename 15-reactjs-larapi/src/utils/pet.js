export const emptyPet = () => ({
  name: "",
  kind: "",
  weight: "",
  age: "",
  breed: "",
  location: "",
  description: "",
});

export const extractPet = (data) => {
  if (!data) return null;
  if (Array.isArray(data.data)) return data.data[0];
  if (data.data) return data.data;
  if (data.pet) return data.pet;
  return data;
};

export const normalizePayload = (form) => {
  const num = (v, parser = Number) => {
    const str = String(v ?? "").trim();
    if (!str) return undefined;
    const n = parser(str);
    return Number.isNaN(n) ? undefined : n;
  };
  return {
    name: String(form.name || ""),
    kind: String(form.kind || ""),
    breed: String(form.breed ?? ""),
    location: String(form.location ?? ""),
    description: String(form.description ?? ""),
    ...(num(form.weight) !== undefined ? { weight: num(form.weight) } : {}),
    ...(num(form.age, (v) => parseInt(v, 10)) !== undefined
      ? { age: num(form.age, (v) => parseInt(v, 10)) }
      : {}),
  };
};
