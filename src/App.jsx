// App.js

import React, { useState } from "react";
import "./App.css";
import { MdOutlineDelete } from "react-icons/md";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <div className="meteorite-container"></div>
      <div className="task-container">
        <h1 className="robot-title">Task Manager</h1>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <div className="task-container_1">
        <span className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {task.text}
              <MdOutlineDelete
                onClick={() => deleteTask(index)}
                size={"20px"}
              />
            </li>
          ))}
        </span>
      </div>
    </div>
  );
};

export default App;
