import './Orders.css'
const Orders = ({ orders }) => (
  <div>
    <h2>Order History</h2>
    {orders.map(o => (
      <div key={o.id}>
        <p><b>Order #{o.id}</b></p>
        <p>Date: {o.date}</p>
        {o.items.map((item, idx) => (
          <p key={idx}>- {item.title}</p>
        ))}
      </div>
    ))}
  </div>
);

export default Orders;
