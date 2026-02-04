import './Cart.css'
const Cart = ({ cart, setCart }) => {

  // REMOVE ITEM FROM CART
  const handleRemoveItem = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

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
    <div className="cart">
      <h2>Cart</h2>

      {cart.length === 0 && <p>Cart is empty</p>}

      <div className="cart-items">
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>₹ {item.price}</p>
              <p className="description">{item.description}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default Cart;

