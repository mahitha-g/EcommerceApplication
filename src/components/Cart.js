const Cart = ({ cart, setCart }) => {

  const handlePlaceOrder = () => {
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      orderDate: new Date().toLocaleString()
    };

    const updatedOrders = [...existingOrders, newOrder];

    // SAVE TO ORDERS STORAGE
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // CLEAR CART
    setCart([]);
    localStorage.removeItem("cart");

    alert("Order placed successfully!");
  };

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, index) => (
        <p key={index}>
          {item.title} - ₹{item.price}
        </p>
      ))}

      {cart.length > 0 && (
        <button onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default Cart;
