import React from 'react';

function TaskList({ tasks, deleteTask, editTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-content">
              <span className="task-name">{task.name}</span>
              <div className="task-details">
                <span className="task-priority">{task.priority} priority</span>
                <span className="task-due-date">Due: {task.dueDate}</span>
              </div>
            </div>
            <div className="task-actions">
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                🗑️
              </button>
              <button
                onClick={() => editTask(task.id)}
                className="edit-button"
              >
                ✏️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
