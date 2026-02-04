import "./Navbar.css";

const Navbar = ({ role, setRole }) => (
  <div className="navbar">
    <button onClick={() => setRole("user")}>User</button>
    <button onClick={() => setRole("vendor")}>Vendor</button>
    <span>Role: {role}</span>
  </div>
);

export default Navbar;
