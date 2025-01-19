
import React from "react";

const Todo = () => {

  // try {
  //   const response = await fetch("https://todo-list-backend-one.vercel.app/api/v1/todo", {
  //     method: "GET",
  //   });
  //   const data = await response.json(); 
  //   console.log(data);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }
  



  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-lg mb-[25px] w-full max-w-lg">
        <header className="bg-blue-600 text-white text-center py-5 rounded-t-lg">
          <h1 className="text-3xl font-bold">My To-Do List</h1>
        </header>
        <div className="p-6">
          {/* Input Section */}
          <div className="mb-6">
            <label
              htmlFor="task"
              className="block text-gray-700 font-semibold mb-2"
            >
              Add a New Task:
            </label>
            <input
              type="text"
              id="task"
              placeholder="Enter task title..."
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Enter task details (optional)..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Add Task
            </button>
          </div>

          {/* Task List */}
          <ul className="space-y-3">
            <li className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow hover:shadow-lg transition duration-300">
              <div>
                <span className="block text-gray-800 font-medium">Task 1</span>
                <span className="block text-gray-500 text-sm">Details for Task 1</span>
              </div>
              <div className="flex space-x-3">
                <button className="text-blue-500 hover:text-blue-700 transition duration-300">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            </li>
            <li className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow hover:shadow-lg transition duration-300">
              <div>
                <span className="block text-gray-800 font-medium">Task 2</span>
                <span className="block text-gray-500 text-sm">Details for Task 2</span>
              </div>
              <div className="flex space-x-3">
                <button className="text-blue-500 hover:text-blue-700 transition duration-300">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 transition duration-300">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
        <footer className="text-center text-sm text-gray-500 py-4 rounded-b-lg">
          © 2025 Muhammad Sumama Khan
        </footer>
      </div>
    </div>
  );
};

export default Todo;
