import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Enter email & password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Welcome Back</h2>
        <p style={subtitle}>Login to continue</p>

        <input
          style={input}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          style={input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button style={button} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={footer}>
          Don't have an account?{" "}
          <span style={link} onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

/* Styles */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
};

const card = {
  background: "#fff",
  padding: "40px 30px",
  borderRadius: 12,
  width: 320,
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const title = {
  textAlign: "center",
  marginBottom: 5,
};

const subtitle = {
  textAlign: "center",
  color: "#666",
  marginBottom: 20,
};

const input = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
};

const button = {
  padding: 12,
  borderRadius: 8,
  border: "none",
  background: "#667eea",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

const footer = {
  textAlign: "center",
  fontSize: 14,
};

const link = {
  color: "#667eea",
  cursor: "pointer",
  fontWeight: "bold",
};