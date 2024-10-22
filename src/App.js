import { useState } from "react";

const Listarr = [];

export default function App() {
  return (
    <div className="app">
      <Header />
      <TodoList />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>My Todo List App!</h1>
      <span>📌</span>
    </div>
  );
}

function TodoList() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(Listarr); // State to handle the task list

  function handleAddTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return; // Prevent adding empty tasks

    const newTaskObject = { task: newTask, id: Date.now() };
    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
    setNewTask(""); // Clear the input after adding
  }
  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="TodoList">
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" className="btn">
          Add Task
        </button>
      </form>
      {tasks.map((item) => (
        <TodoItem
          text={item.task}
          key={item.id}
          completed={item.completed}
          onDelete={() => handleDeleteTask(item.id)}
          onToggle={() => handleToggleTask(item.id)}
        />
      ))}
    </div>
  );
}

function TodoItem({ text, completed, onDelete, onToggle }) {
  return (
    <div className="task-item">
        <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="task-checkbox"
      />
      <h3 style={{ textDecoration: completed ? "line-through" : "none" }}>{text}</h3>
      <button className="task-btn" onClick={onDelete}>
        ❌
      </button>
    </div>
  );
}
