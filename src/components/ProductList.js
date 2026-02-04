import { useState } from "react";
import "./ProductList.css";

const ProductList = ({ products, cart, setCart }) => {
  const [search, setSearch] = useState("");

  // ADD TO CART → cart localStorage
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="product-list">
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="product-grid">
        {products
          .filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
          )
          .map(p => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.title} />

              <h3>{p.title}</h3>
              <p>₹ {p.price}</p>

              <button onClick={() => handleAddToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
