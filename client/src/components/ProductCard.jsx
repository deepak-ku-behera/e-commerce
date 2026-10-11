
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image">
        <img
          src={product.image || "https://placehold.co/400x300?text=Product"}
          alt={product.name}
        />
      </Link>

      <div className="product-info">
        <span className="category-label">
          {product.category || "General"}
        </span>

        <h3>{product.name}</h3>
        <p>{product.description || "Quality product at a great price."}</p>

        <div className="product-bottom">
          <strong>₹{Number(product.price).toLocaleString("en-IN")}</strong>

          <button
            className="add-button"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={16} />
            {product.stock === 0 ? "Out of stock" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
