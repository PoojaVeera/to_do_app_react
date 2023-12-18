// App.js

import React, { useEffect, useState } from "react";
import "./App.css";
import { MdOutlineDelete } from "react-icons/md";
import * as S from "./App.styles";
import ConfettiExplosion from "react-confetti-explosion";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  console.log(isExploding);
  const addTask = () => {
    setIsExploding(false);
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    setIsExploding(false);
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    if (updatedTasks[index].completed) {
      setIsExploding(true);
    } else {
      setIsExploding(false);
    }
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <div className="task-container">
        <S.Title>Task Manager</S.Title>
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
              <span
                style={{ cursor: "pointer" }}
                className={task.completed ? "completed" : ""}
                onClick={() => toggleTask(index)}
              >
                {task.text}
              </span>
              {isExploding && <ConfettiExplosion />}

              <MdOutlineDelete
                color="#00ffcc"
                style={{ cursor: "pointer" }}
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
