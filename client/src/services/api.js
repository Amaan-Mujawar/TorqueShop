const API_BASE = "http://localhost:8000/api";

export async function fetchProducts(query = "") {
  const res = await fetch(`${API_BASE}/products${query}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
