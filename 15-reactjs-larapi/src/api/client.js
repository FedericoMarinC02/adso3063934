const API_URL = "http://127.0.0.1:8000/api";
const defaultHeaders = { Accept: "application/json" };

const withAuth = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const toAxiosLike = async (response) => {
  let data = null;
  try {
    data = await response.clone().json();
  } catch (_) {
    /* ignore parse errors */
  }
  if (!response.ok) {
    const err = new Error(response.statusText || "Request error");
    err.response = { status: response.status, data };
    throw err;
  }
  return { data, status: response.status };
};

export const request = (path, options = {}) => {
  const { headers, ...rest } = options;
  return fetch(`${API_URL}${path}`, {
    ...rest,
    headers: { ...defaultHeaders, ...withAuth(), ...(headers || {}) },
  }).then(toAxiosLike);
};

export const json = (method, path, body) =>
  request(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
