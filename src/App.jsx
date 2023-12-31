// App.js

import React, { useEffect, useState } from "react";
import "./App.css";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import * as S from "./App.styles";
import ConfettiExplosion from "react-confetti-explosion";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    // Retrieve tasks from localStorage if available, otherwise default to an empty array
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");
  const [dialog, setDialog] = useState(false);
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
  const EditTask = (index) => {
    setDialog(true);
    setEditedTaskIndex(index);
    setEditedTaskText(tasks[index].text);
  };
  const updateTaskText = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editedTaskIndex].text = editedTaskText;
    setTasks(updatedTasks);
    setDialog(false);
  };
  const handleClose = () => {
    setDialog(false); // This will close the dialog when called
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
              <S.rowFlex>
                {!task.completed && (
                  <MdOutlineEdit
                    color="#00ffcc"
                    style={{ cursor: "pointer" }}
                    onClick={() => EditTask(index)}
                    size={"20px"}
                  />
                )}
                <MdOutlineDelete
                  color="#00ffcc"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteTask(index)}
                  size={"20px"}
                />
              </S.rowFlex>
            </li>
          ))}
        </span>
        {dialog && (
          <Dialog open={dialog} onClose={handleClose}>
            <S.Dialog>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogContent>
                <Input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)} // Corrected this line
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={updateTaskText}>Update</Button>{" "}
              </DialogActions>
            </S.Dialog>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default App;
