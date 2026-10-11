
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    const params = {};
    if (search.trim()) params.search = search.trim();
    if (category) params.category = category;

    api.get("/products", { params })
      .then(({ data }) => {
        if (!active) return;
        setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch(() => {
        if (active) setError("Unable to fetch products.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [search, category]);

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">SHOP THE COLLECTION</span>
          <h2>All products</h2>
        </div>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">All categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
