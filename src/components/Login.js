import { useState } from "react";
import "./Login.css";

const Login = ({ setRole, setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRoleInput] = useState("user");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Demo credentials
    if (
      (role === "user" && username === "user" && password === "user123") ||
      (role === "vendor" && username === "vendor" && password === "vendor123")
    ) {
      setRole(role);
      setIsLoggedIn(true);
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={e => setRoleInput(e.target.value)}
        >
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button onClick={handleLogin}>Login</button>

        <p className="hint">
          User → <b>user / user123</b><br />
          Vendor → <b>vendor / vendor123</b>
        </p>
      </div>
    </div>
  );
};

export default Login;
