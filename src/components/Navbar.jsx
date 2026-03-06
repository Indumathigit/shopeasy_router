import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#4db6ac",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>

      <Link to="/" style={{ color: "white", fontSize: "20px", fontWeight: "bold", textDecoration: "none" }}>
        🛍️ ShopEasy
      </Link>

      <Link to="/cart" style={{ textDecoration: "none" }}>
        <button style={{
          backgroundColor: "white",
          color: "#4db6ac",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          🛒 Cart (<span id="cart-count">0</span>)
        </button>
      </Link>

    </nav>
  );
}

export default Navbar;