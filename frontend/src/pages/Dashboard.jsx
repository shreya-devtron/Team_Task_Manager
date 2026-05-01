import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/tasks/dashboard/stats");

      console.log("DASHBOARD DATA:", res.data); // debug

      // ✅ Safe fallback structure
      setData({
        totalTasks: res.data?.totalTasks || 0,
        tasksByStatus: res.data?.tasksByStatus || {
          "To Do": 0,
          "In Progress": 0,
          "Done": 0,
        },
      });

    } catch (err) {
      console.error(err);

      // ✅ Prevent blank screen on error
      setData({
        totalTasks: 0,
        tasksByStatus: {
          "To Do": 0,
          "In Progress": 0,
          "Done": 0,
        },
      });

      alert("Failed to load dashboard");
    }
  };

  if (!data) return <p style={{ padding: 30 }}>Loading...</p>;

  return (
    <div
      style={{
        padding: 30,
        background: "#f4f6f8",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 30
        }}
      >
        <Card title="Total Tasks" value={data.totalTasks} color="#4CAF50" />
        <Card title="To Do" value={data.tasksByStatus["To Do"] || 0} color="#FF9800" />
        <Card title="In Progress" value={data.tasksByStatus["In Progress"] || 0} color="#2196F3" />
        <Card title="Done" value={data.tasksByStatus["Done"] || 0} color="#9C27B0" />
      </div>

      <button
        onClick={() => (window.location.href = "/projects")}
        style={{
          padding: "10px 20px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        View Tasks
      </button>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        width: 180,
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        borderLeft: `6px solid ${color}`,
        textAlign: "center"
      }}
    >
      <h4 style={{ marginBottom: 10 }}>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}