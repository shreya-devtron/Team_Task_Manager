import { useEffect, useState } from "react";
import API from "../services/api";

export default function ProjectView() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      console.log("PROJECT API:", res.data);

      // handle both possible response formats
      const list = Array.isArray(res.data)
        ? res.data
        : res.data.projects || [];

      setProjects(list);

      if (list.length > 0) {
        const firstProject = list[0]._id;
        setSelectedProject(firstProject);
        fetchTasks(firstProject);
      }
    } catch (err) {
      console.error(err);
      setProjects([]);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const res = await API.get(`/tasks/project/${projectId}`);

      console.log("TASK API:", res.data);

      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask || !selectedProject) return;

    try {
      await API.post("/tasks", {
        title: newTask,
        projectId: selectedProject,
      });

      setNewTask("");
      fetchTasks(selectedProject);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks(selectedProject);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Projects</h1>

      {/* Project Dropdown */}
      {projects.length > 0 ? (
        <select
          value={selectedProject}
          onChange={(e) => {
            setSelectedProject(e.target.value);
            fetchTasks(e.target.value);
          }}
        >
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      ) : (
        <p>No projects found</p>
      )}

      {/* Create Task */}
      <div style={{ marginTop: 20 }}>
        <input
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div style={{ marginTop: 20 }}>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                padding: 10,
                marginBottom: 10,
                background: "#fff",
                borderRadius: 6,
              }}
            >
              <b>{task.title}</b>

              <div>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}