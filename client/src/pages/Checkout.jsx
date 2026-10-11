
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "COD",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      await api.post("/orders", {
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
        },
        paymentMethod: form.paymentMethod,
        totalPrice: total,
      });

      clearCart();
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Could not place your order.");
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <section className="empty-cart">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="primary-button">Browse products</Link>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <form className="auth-card checkout-card" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Enter your delivery details.</p>

        {error && <p className="error-message">{error}</p>}

        <label>Full name</label>
        <input
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <label>Address</label>
        <textarea
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />

        <label>City</label>
        <input
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />

        <label>Postal code</label>
        <input
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          required
        />

        <label>Payment method</label>
        <select
          value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="RAZORPAY">Razorpay</option>
        </select>

        <h3 className="checkout-total">
          Total: ₹{total.toLocaleString("en-IN")}
        </h3>

        <button className="primary-button full-button" disabled={loading}>
          {loading ? "Placing order..." : "Place order"}
        </button>
      </form>
    </section>
  );
}
