import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Todo = () => {
  const titleInput = useRef();
  const descriptionInput = useRef();
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://todo-list-backend-one.vercel.app/api/v1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleInput.current.value.trim();
    const description = descriptionInput.current.value.trim();

    if (!title && !description) {
      setError("Title or description is required!");
      return;
    }

    try {
      setLoading(true);
      if (editingTodo) {
        const response = await axios.put(`${BASE_URL}/todo/${editingTodo._id}`, {
          title,
          description,
        });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === editingTodo._id ? response.data.data : todo
          )
        );
        setEditingTodo(null);
      } else {
        const response = await axios.post(`${BASE_URL}/todo`, {
          title,
          description,
        });
        setTodos((prevTodos) => [...prevTodos, response.data.data]);
      }

      titleInput.current.value = "";
      descriptionInput.current.value = "";
      setError(null);
    } catch (error) {
      console.error("Error saving todo:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to save todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/todo/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (error) {
      console.error("Error deleting todo:", error.response?.data || error.message);
      setError("Failed to delete todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (todo) => {
    setEditingTodo(todo);
    titleInput.current.value = todo.title;
    descriptionInput.current.value = todo.description || "";
  };

  useEffect(() => {
    async function getAllTodo() {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/todo`);
        setTodos(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching todos:", error.response || error.message);
        setError("Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    }
    getAllTodo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">My To-Do List</h1>

      {/* Input Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="task" className="block text-lg font-medium text-gray-700">Add a New Task:</label>
        <input
          type="text"
          id="task"
          placeholder="Enter task title..."
          ref={titleInput}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Enter task details (optional)..."
          ref={descriptionInput}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingTodo ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {/* Task List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <ul className="space-y-4 mt-6">
          {todos.map((item) => (
            <li key={item._id} className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md shadow-sm">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-800">{item.title}</span>
                <span className="text-gray-600">{item.description}</span>
              </div>
              <br />
              <div className="flex space-x-3">
                <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-700">Edit</button>
                <button onClick={() => deleteTodo(item._id)} className="text-red-600 hover:text-red-700">Delete</button>
              </div>
            </li>
          ))}
          {todos.length === 0 && !loading && <p className="text-center text-gray-600">No tasks found.</p>}
        </ul>
      )}
    </div>
  );
};

export default Todo;
