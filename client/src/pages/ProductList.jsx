import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const query = `?page=${page}&limit=12&q=${search}`;

  const { data, loading, error } = useProducts(query);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search automotive parts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading products...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="grid">
        {data.products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
