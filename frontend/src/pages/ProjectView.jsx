import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProjectView() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data || []);
    } catch {
      setTasks([]);
    }
  };

  const createTask = async () => {
    if (!title) {
      alert("Enter task title");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        status: "To Do",
      });

      setTitle("");
      fetchTasks();
    } catch {
      alert("Failed to create task");
    }
  };

  return (
    <div style={container}>
      <h2>Create Task</h2>

      <div style={form}>
        <input
          style={input}
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button style={button} onClick={createTask}>
          Add Task
        </button>
      </div>

      <h3 style={{ marginTop: 30 }}>Tasks</h3>

      <div style={list}>
        {tasks.map((t) => (
          <div key={t._id} style={card}>
            {t.title} — {t.status}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Styles */

const container = {
  padding: 40,
};

const form = {
  display: "flex",
  gap: 10,
  marginTop: 20,
};

const input = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const button = {
  padding: "10px 15px",
  background: "#667eea",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const list = {
  marginTop: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const card = {
  padding: 12,
  background: "#fff",
  borderRadius: 8,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};