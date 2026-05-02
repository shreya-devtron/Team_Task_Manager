import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={nav}>
      <div style={logo}>TeamTaskManager</div>

      <div style={menu}>
        <NavItem
          label="Dashboard"
          active={location.pathname === "/dashboard"}
          onClick={() => navigate("/dashboard")}
        />

        <NavItem
          label="Projects"
          active={location.pathname === "/projects"}
          onClick={() => navigate("/projects")}
        />
      </div>

      <button style={logoutBtn} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

/* Nav Item */
function NavItem({ label, active, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        ...navItem,
        borderBottom: active ? "2px solid #fff" : "none",
      }}
    >
      {label}
    </span>
  );
}

/* Styles */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 30px",
  background: "#333",
  color: "#fff",
};

const logo = {
  fontWeight: "bold",
  fontSize: 18,
};

const menu = {
  display: "flex",
  gap: 20,
};

const navItem = {
  cursor: "pointer",
  paddingBottom: 4,
};

const logoutBtn = {
  background: "#ff4d4d",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
};