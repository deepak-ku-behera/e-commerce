
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/products")
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list.slice(0, 8));
      })
      .catch(() => setError("Could not load products. Check your backend."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">WELCOME TO SHOPEASE</span>
          <h1>Find your next <span>favorite thing.</span></h1>
          <p>
            Discover quality products, great prices, and a convenient
            shopping experience all in one place.
          </p>
          <Link to="/products" className="primary-button">
            Explore Products <ArrowRight size={18} />
          </Link>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85"
            alt="Shopping collection"
          />
        </div>
      </section>

      <section className="benefits">
        <div><Truck /><span>Easy shopping</span></div>
        <div><ShieldCheck /><span>Secure accounts</span></div>
        <div><Headphones /><span>Customer first</span></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OUR COLLECTION</span>
            <h2>Featured products</h2>
          </div>
          <Link to="/products" className="text-link">View all →</Link>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>No products found. Add some products to your database.</p>
        )}

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
