export const getApiMessage = (data, fallback = "") => {
  try {
    if (!data) return fallback;
    if (typeof data === "string") return data;
    if (data.message) return String(data.message);
    if (data.error) return String(data.error);
    if (data.errors && typeof data.errors === "object") {
      const firstKey = Object.keys(data.errors)[0];
      const val = data.errors[firstKey];
      if (Array.isArray(val)) return String(val[0]);
      if (val != null) return String(val);
    }
    return fallback;
  } catch (e) {
    return fallback;
  }
};
