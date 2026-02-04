import { useState } from "react";
import "./ProductList.css";

const ProductList = ({ products, cart, setCart }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState([0, Infinity]); // [min, max]

  // ADD TO CART → cart localStorage
  const handleAddToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Get unique categories from products
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Filter products based on search, category, availability, and price
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    const matchesAvailability =
      availability === "all" ||
      (availability === "available" && p.inStock) ||
      (availability === "unavailable" && !p.inStock);
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesAvailability && matchesPrice;
  });

  return (
    <div className="product-list">
      <h2>Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          onChange={(e) =>
            setPriceRange([Number(e.target.value), priceRange[1]])
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>₹ {p.price}</p>
            <p className="description">{p.description}</p>
            <p>
              <strong>Status:</strong> {p.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <button
              onClick={() => handleAddToCart(p)}
              disabled={!p.inStock}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

