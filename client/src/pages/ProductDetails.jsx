
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data.product || data))
      .catch(() => setError("Product not found."));
  }, [id]);

  if (error) return <section className="section">{error}</section>;
  if (!product) return <section className="section">Loading product...</section>;

  return (
    <section className="section">
      <div className="details-layout">
        <img
          className="details-image"
          src={product.image || "https://placehold.co/500x400?text=Product"}
          alt={product.name}
        />

        <div>
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2 className="details-price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </h2>
          <p>Stock: {product.stock ?? "Not specified"}</p>

          <button
            className="primary-button"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            {product.stock === 0 ? "Out of stock" : "Add to cart"}
          </button>

          <Link to="/products" className="continue-shopping">
            Back to products
          </Link>
        </div>
      </div>
    </section>
  );
}
