const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api"; // Vite env

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

export const productsAPI = {
  list: () => request("/products"),
  get: (id) => request(`/products/${id}`),
  create: (data) =>
    request("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => request(`/products/${id}`, { method: "DELETE" }),
};
