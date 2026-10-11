
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, total, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products before checking out.</p>
        <Link to="/products" className="primary-button">Shop now</Link>
      </section>
    );
  }

  return (
    <section className="section">
      <h2>Your shopping cart</h2>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item._id}>
              <img
                src={item.image || "https://placehold.co/120x120?text=Product"}
                alt={item.name}
              />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{Number(item.price).toLocaleString("en-IN")}</p>

                <div className="quantity-control">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >−</button>

                  <span>{item.quantity}</span>

                  <button
                    disabled={item.quantity >= (item.stock ?? Infinity)}
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >+</button>
                </div>
              </div>

              <div className="cart-item-end">
                <strong>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item._id)}
                >Remove</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="order-summary">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>
          <Link to="/checkout" className="primary-button full-button">
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
