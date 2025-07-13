import React, { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Buy groceries",
      desc: "Milk, Bread, Eggs, Fruits",
      completed: false,
    },
    {
      id: 2,
      title: "Study React",
      desc: "Finish component lifecycle and hooks",
      completed: false,
    },
    {
      id: 3,
      title: "Exercise",
      desc: "30 mins walk and 15 mins yoga",
      completed: true,
    },
  ]);
  const [filter, setFilter] = useState("todo");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!title.trim()) return;

    if (editId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, title, desc } : todo
        )
      );
      toast.info("Task updated");
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title,
          desc,
          completed: false,
        },
      ]);
      toast.success("Task added");
    }

    setTitle("");
    setDesc("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    toast("Task toggled");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.error("Task deleted");
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDesc(todo.desc);
    setEditId(todo.id);
  };

  const filteredTodos =
    filter === "todo"
      ? todos.filter((t) => !t.completed)
      : todos.filter((t) => t.completed);

  return (
    <div className="container">
      <h1>🔥 My Todos</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="What's the title of your To Do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="What's the description of your To Do?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>
      </div>

      <div className="tabs">
        <button
          className={`todo-btn ${filter === "todo" ? "active" : ""} ${
            todos.some((t) => !t.completed) ? "has-pending" : ""
          }`}
          onClick={() => setFilter("todo")}
        >
          To Do
          {todos.some((t) => !t.completed) && (
            <span className="badge red">
              {todos.filter((t) => !t.completed).length}
            </span>
          )}
        </button>

        <button
          className={`completed-btn ${filter === "completed" ? "active" : ""} ${
            todos.some((t) => t.completed) ? "has-completed" : ""
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
          {todos.some((t) => t.completed) && (
            <span className="badge green">
              {todos.filter((t) => t.completed).length}
            </span>
          )}
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div className="todo-card" key={todo.id}>
            <div>
              <h3>{todo.title}</h3>
              <p>{todo.desc}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(todo)}>✏️</button>
              <button onClick={() => handleDelete(todo.id)}>🗑️</button>
              <button onClick={() => toggleComplete(todo.id)}>✅</button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
