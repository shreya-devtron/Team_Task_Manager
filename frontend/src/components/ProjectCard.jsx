import React from "react";

export default function ProjectCard({ task, onUpdate }) {
  return (
    <div style={card}>
      <h3>{task.title}</h3>

      <p style={{ color: "#555" }}>{task.description}</p>

      <p>
        Status:{" "}
        <span style={statusStyle(task.status)}>
          {task.status}
        </span>
      </p>

      {/* Buttons (hide if Done) */}
      {task.status !== "Done" && (
        <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
          <button
            style={btn("#2196F3")}
            onClick={() => onUpdate(task._id, "In Progress")}
          >
            Start
          </button>

          <button
            style={btn("#4CAF50")}
            onClick={() => onUpdate(task._id, "Done")}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
}

/* 🎨 Styles */

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  marginBottom: 15,
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
};

const btn = (color) => ({
  padding: "8px 15px",
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
});

const statusStyle = (status) => ({
  fontWeight: "bold",
  color:
    status === "Done"
      ? "green"
      : status === "In Progress"
      ? "blue"
      : "orange"
});