import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import VendorDashboard from "./components/VendorDashboard";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  // 🔹 LOAD CART FROM LOCALSTORAGE
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // 🔹 SAVE CART TO LOCALSTORAGE WHENEVER IT CHANGES
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    setCart([]);
    localStorage.removeItem("cart"); // optional
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        {showRegister ? (
          <Register onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <Login setRole={setRole} setIsLoggedIn={setIsLoggedIn} />
        )}

        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? "Go to Login" : "Create New Account"}
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {role === "user" && (
        <>
          <ProductList products={products} cart={cart} setCart={setCart} />
          <Cart cart={cart} setCart={setCart} setOrders={setOrders} />
        </>
      )}

      {role === "vendor" && (
        <VendorDashboard
          products={products}
          setProducts={setProducts}
          orders={orders}
        />
      )}
    </div>
  );
};

export default App;
