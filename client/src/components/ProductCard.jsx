export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.images?.[0]?.url || "https://via.placeholder.com/150"}
        alt={product.title}
        className="product-img"
      />

      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="brand">{product.brand}</p>
        <p className="price">₹{product.price}</p>
      </div>
    </div>
  );
}
