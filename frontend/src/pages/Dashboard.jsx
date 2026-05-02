import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      const tasks = res.data || [];

      const stats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === "To Do").length,
        progress: tasks.filter(t => t.status === "In Progress").length,
        done: tasks.filter(t => t.status === "Done").length,
      };

      setData(stats);
    } catch {
      setData({ total: 0, todo: 0, progress: 0, done: 0 });
    }
  };

  if (!data) return <p style={{ padding: 30 }}>Loading...</p>;

  return (
    <div style={container}>
      <h1 style={title}>Dashboard</h1>

      <div style={grid}>
        <Card label="Total Tasks" value={data.total} color="#4CAF50" />
        <Card label="To Do" value={data.todo} color="#FF9800" />
        <Card label="In Progress" value={data.progress} color="#2196F3" />
        <Card label="Done" value={data.done} color="#9C27B0" />
      </div>
    </div>
  );
}

/* Card Component */
function Card({ label, value, color }) {
  return (
    <div style={{ ...card, borderTop: `6px solid ${color}` }}>
      <h3>{label}</h3>
      <h2>{value}</h2>
    </div>
  );
}

/* Styles */

const container = {
  padding: 40,
  background: "#f4f6f8",
  minHeight: "100vh",
};

const title = {
  marginBottom: 30,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 20,
};

const card = {
  background: "#fff",
  padding: 25,
  borderRadius: 12,
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  textAlign: "center",
};