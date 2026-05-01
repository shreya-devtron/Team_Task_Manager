import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onStatusChange, onDelete }) {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-info">
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Due:</strong> {task.dueDate ? formatDate(task.dueDate) : 'No date'}</p>
        {task.assignedTo && <p><strong>Assigned to:</strong> {task.assignedTo.name}</p>}
      </div>
      <div className="task-actions">
        <select onChange={(e) => onStatusChange(task._id, e.target.value)} defaultValue={task.status}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  );
}

export default TaskCard;