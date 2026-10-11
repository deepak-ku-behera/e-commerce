
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <Store size={25} />
        ShopEase<span>.</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>

        <NavLink to="/cart" className="cart-link">
          <ShoppingCart size={19} />
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </NavLink>

        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button className="nav-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Link to="/register" className="nav-register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
