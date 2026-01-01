import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

export function useProducts(queryString) {
  const [data, setData] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchProducts(queryString)
      .then(res => {
        setData({ products: res.products, total: res.total });
        setError("");
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [queryString]);

  return { data, loading, error };
}
