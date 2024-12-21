import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ name: '', priority: 'Medium', dueDate: '' });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditingTask({ ...taskToEdit });
  };

  const saveTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, ...editingTask } : task
      )
    );
    setEditingTaskId(null);
    setEditingTask({ name: '', priority: 'Medium', dueDate: '' });
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
      
      {editingTaskId && (
        <div className="edit-form">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editingTask.name}
            onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
            className="edit-input"
          />
          <div className="priority-date">
            <select
              value={editingTask.priority}
              onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
              className="edit-priority-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="date"
              value={editingTask.dueDate}
              onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
              className="edit-due-date-input"
            />
          </div>
          <button onClick={saveTask} className="save-button">Save</button>
        </div>
      )}
    </div>
  );
}

export default App;
