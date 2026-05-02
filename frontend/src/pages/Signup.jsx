import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", form);

      console.log("SIGNUP RESPONSE:", res.data);

      alert("Signup successful");

      // redirect to login
      navigate("/login");

    } catch (err) {
      console.error("SIGNUP ERROR:", err);

      alert(
        err.response?.data?.message ||
        "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginBottom: 20 }}>Signup</h2>

        <input
          style={input}
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          style={input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          style={button}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p style={{ marginTop: 10 }}>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
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
  background: "#f4f6f8",
};

const card = {
  background: "#fff",
  padding: 30,
  borderRadius: 12,
  width: 320,
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: 15,
};

const input = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const button = {
  padding: 10,
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};