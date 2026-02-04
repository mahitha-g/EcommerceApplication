import { useState,useEffect } from "react";
import "./VendorDashboard.css";

const VendorDashboard = ({ products, setProducts, orders }) => {
  const emptyProduct = {
    title: "",
    price: "",
    category: "",
    image: "",
    description: ""
  };

  const [localOrders, setLocalOrders] = useState([]);

useEffect(() => {
  const storedOrders =
    JSON.parse(localStorage.getItem("orders")) || [];
  setLocalOrders(storedOrders);
}, []);

  const [formData, setFormData] = useState(emptyProduct);
  const [editId, setEditId] = useState(null);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ADD PRODUCT
  const handleAdd = () => {
    if (!formData.title || !formData.price) return;

    const newProduct = {
      ...formData,
      id: Date.now(),
      price: Number(formData.price),
      rating: { count: 1 }
    };

    setProducts((prev) => [...prev, newProduct]);
    setFormData(emptyProduct);
  };

  // EDIT CLICK
  const handleEdit = (product) => {
    setEditId(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category || "",
      image: product.image || "",
      description: product.description || ""
    });
  };

  // UPDATE PRODUCT
  const handleUpdate = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editId
          ? { ...p, ...formData, price: Number(formData.price) }
          : p
      )
    );

    setEditId(null);
    setFormData(emptyProduct);
  };

  // DELETE PRODUCT
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="vendor">
      <h2>Vendor Dashboard</h2>

      {/* ADD / EDIT FORM */}
      <div className="vendor-add">
        <h3>{editId ? "Edit Product" : "Add Product"}</h3>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        {editId ? (
          <button onClick={handleUpdate}>Update Product</button>
        ) : (
          <button onClick={handleAdd}>Add Product</button>
        )}
      </div>

      {/* PRODUCT LIST */}
      <h3>All Products</h3>

      {products.length === 0 && <p>No products available</p>}

      {products.map((p) => (
        <div className="vendor-product" key={p.id}>
          {p.image && <img src={p.image} alt={p.title} />}

          <div>
            <h4>{p.title}</h4>
            <p>₹ {p.price}</p>
            <p>{p.category}</p>
          </div>

          <button onClick={() => handleEdit(p)}>Edit</button>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}

      {/* SALES HISTORY */}
      <h3 className="sales-title">Sales History</h3>
{localOrders.length === 0 && <p>No purchases yet</p>}

{localOrders.map(order => (
  <div className="order-card" key={order.id}>
    <p><strong>Order ID:</strong> {order.id}</p>
    <p><strong>Time:</strong> {order.timestamp}</p>

    {order.items.map((item, i) => (
      <div className="sold-product" key={i}>
        <img src={item.image} alt={item.title} />
        <div>
          <p>{item.title}</p>
          <p>₹ {item.price}</p>
        </div>
      </div>
    ))}
  </div>
))}

    </div>
  );
};

export default VendorDashboard;

