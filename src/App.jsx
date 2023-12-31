// App.js

import React, { useEffect, useState } from "react";
import "./App.css";
import "./styles/tailwind.css";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import * as S from "./App.styles";
import ConfettiExplosion from "react-confetti-explosion";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage if available, otherwise default to an empty array
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    setIsExploding(false);
    if (newTask.trim() !== "") {
      setTasks([{ text: newTask, completed: false }, ...tasks]);
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
              <span>
                <MdOutlineEdit
                  color="#00ffcc"
                  style={{ cursor: "pointer" }}
                  onClick={() => EditTask(index)}
                  size={"20px"}
                />
                <MdOutlineDelete
                  color="#00ffcc"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteTask(index)}
                  size={"20px"}
                />
              </span>
            </li>
          ))}
        </span>
      </div>
    </div>
  );
};

export default App;
