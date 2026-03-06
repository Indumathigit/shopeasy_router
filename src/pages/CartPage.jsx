import { useEffect } from "react";
import { Link } from "react-router-dom";

function CartPage({ cart }) {

  function updateTotal() {
    const total    = cart.current.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = total * 0.10;
    const final    = total - discount;

    document.getElementById("total-price").textContent    = "$" + total.toFixed(2);
    document.getElementById("discount-price").textContent = "-$" + discount.toFixed(2);
    document.getElementById("final-price").textContent    = "$" + final.toFixed(2);
  }

  function renderCart() {
    const container = document.getElementById("cart-container");
    if (!container) return;

    if (cart.current.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px; color:gray;">
          <p style="font-size:50px;">🛒</p>
          <p style="font-size:18px; margin:10px 0;">Your cart is empty!</p>
          <a href="/" style="color:#4db6ac; font-weight:bold;">← Go back to shop</a>
        </div>
      `;
      updateTotal();
      return;
    }

    container.innerHTML = "";

    cart.current.forEach(item => {
      const itemTotal = (item.price * item.quantity).toFixed(2);

      const row = document.createElement("div");
      row.style.background = "white";
      row.style.padding = "15px";
      row.style.borderRadius = "10px";
      row.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "15px";
      row.style.marginBottom = "15px";

      row.innerHTML = `
        <img src="${item.image}" style="width:80px; height:80px; object-fit:contain; background:#f9fafb; border-radius:8px; padding:5px;" />

        <div style="flex:1;">
          <p style="font-size:14px; font-weight:bold;">${item.title}</p>
          <p style="color:#ec4899; font-weight:bold;">$${item.price}</p>
        </div>

        <div style="display:flex; align-items:center; gap:10px;">
          <button class="decrease-btn" style="width:30px; height:30px; border-radius:50%; border:none; background:#e5e7eb; font-size:18px; cursor:pointer;">-</button>
          <span style="font-weight:bold; font-size:16px;">${item.quantity}</span>
          <button class="increase-btn" style="width:30px; height:30px; border-radius:50%; border:none; background:#e5e7eb; font-size:18px; cursor:pointer;">+</button>
        </div>

        <p style="font-weight:bold; font-size:16px;">$${itemTotal}</p>

        <button class="remove-btn" style="background:#fee2e2; color:#ef4444; border:1px solid #ef4444; padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:bold;">
          Remove
        </button>
      `;

      row.querySelector(".increase-btn").addEventListener("click", () => {
        item.quantity++;
        renderCart();
      });

      row.querySelector(".decrease-btn").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          renderCart();
        }
      });

      row.querySelector(".remove-btn").addEventListener("click", () => {
        cart.current = cart.current.filter(i => i.id !== item.id);
        renderCart();
      });

      container.appendChild(row);
    });

    updateTotal();
  }

  useEffect(() => {
    renderCart();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px" }}>🛒 Your Cart</h2>
        <Link to="/" style={{ color: "#4db6ac", fontWeight: "bold", textDecoration: "none" }}>
          ← Continue Shopping
        </Link>
      </div>

      <div id="cart-container"></div>

      <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginTop: "20px" }}>
        <h3 style={{ marginBottom: "15px" }}>Order Summary</h3>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span>Total</span>
          <span id="total-price">$0.00</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "green" }}>
          <span>Discount (10%)</span>
          <span id="discount-price">-$0.00</span>
        </div>

        <hr style={{ margin: "10px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
          <span>Final Price</span>
          <span id="final-price" style={{ color: "#ec4899" }}>$0.00</span>
        </div>
      </div>

    </div>
  );
}

export default CartPage;