import { useEffect } from "react";

function ProductsPage({ cart }) {

  function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (el) el.textContent = cart.current.length;
  }

  function handleCartClick(product) {
    const alreadyAdded = cart.current.find(item => item.id === product.id);

    if (alreadyAdded) {
      cart.current = cart.current.filter(item => item.id !== product.id);
      updateCartCount();
      document.getElementById(`btn-${product.id}`).textContent = "Add to Cart";
      document.getElementById(`btn-${product.id}`).style.backgroundColor = "black";
    } else {
      cart.current.push({ ...product, quantity: 1 });
      updateCartCount();
      document.getElementById(`btn-${product.id}`).textContent = "Remove from Cart";
      document.getElementById(`btn-${product.id}`).style.backgroundColor = "red";
    }
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {

        document.getElementById("loading-msg").remove();

        const grid = document.getElementById("product-grid");

        data.forEach(product => {

          const card = document.createElement("div");
          card.style.background = "white";
          card.style.padding = "15px";
          card.style.borderRadius = "10px";
          card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

          card.innerHTML = `
            <img src="${product.image}" style="width:100%; height:180px; object-fit:contain;" />
            <p style="font-size:14px; margin:10px 0;">${product.title}</p>
            <p style="font-size:12px; color:gray;">${product.description.substring(0, 60)}...</p>
            <p style="font-size:18px; font-weight:bold; color:#ec4899;">$${product.price}</p>
            <p style="font-size:12px; color:gray;">⭐ ${product.rating.rate}</p>
            <button id="btn-${product.id}" style="width:100%; padding:10px; background:black; color:white; border:none; border-radius:8px; cursor:pointer; margin-top:10px;">
              Add to Cart
            </button>
          `;

          card.querySelector("button").addEventListener("click", () => {
            handleCartClick(product);
          });

          grid.appendChild(card);
        });

      });
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>All Products</h2>

      <p id="loading-msg" style={{ textAlign: "center" }}>Loading products...</p>

      <div id="product-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
      }}>
      </div>

    </div>
  );
}

export default ProductsPage;