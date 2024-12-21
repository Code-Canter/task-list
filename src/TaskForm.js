import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTask = task.trim();
    if (trimmedTask) {
      addTask({
        id: Date.now(),
        name: trimmedTask,
        priority,
        dueDate,
      });
      setTask('');
      setPriority('Medium');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task"
        className="task-input"
      />
      <div className="priority-date">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="due-date-input"
        />
      </div>
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
}

export default TaskForm;
