import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AssignmentIcon from '@mui/icons-material/Assignment';
import type { Task } from "./interfaces";
import TodoList from "./TodoList";

type Filter = "all" | "active" | "completed";

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);//array
  const [taskInput, setTaskInput] = useState("");//input
  const [filter, setFilter] = useState<Filter>("all");//filter
  const [toggleAllActive, setToggleAllActive] = useState(false);
  const [editText, setEditText] = useState <string|null> (null);//update task
  const [editInput, setEditInput] = useState("");//edit input value

  const addTask = () => {
    const trimmedText = taskInput.trim();
    if (!trimmedText) return;
    const newTask: Task = {
      id: uuidv4(),
      text: trimmedText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const deleteTask = (id: string) => {
  setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string) => {
  const updated = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTasks(updated);
  };

  const toggleAllTasks = () => {
    const allCompleted = tasks.every((task) => task.completed);
    const updated = tasks.map((task) => ({
      ...task,
      completed: !allCompleted,
    }));
    setTasks(updated);
    setToggleAllActive(!allCompleted);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    setFilter("all");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const hasCompletedTasks = tasks.some((task) => task.completed);

  //update task
  const updateTask = ({ id, text }: { id: string; text: string }) => {
    const trimmedText = text.trim();
    if (trimmedText === "") return;
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, text: trimmedText } : task
   );
  setTasks(updated);
  setEditText(null);
  setEditInput("");
  };

//copy
const Copy = () => {
  if (taskInput.trim() !== "") {
    navigator.clipboard.writeText(taskInput)
      .then(() => alert('Copied to clipboard!'))
      .catch(() => alert('Failed to copy.'));
  } else {
    alert('Please enter something to copy...');
  }
};

return (
  <Box
    sx={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "90vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      backgroundColor: "#c8e6c9",
      pt: 6,
    }}
  >
    <Typography
      variant="h4"
      align="center"
      gutterBottom
      sx={{
        color: "#2e7d32",
        fontWeight: 600,
        letterSpacing: 2,
        mb: 4,
        fontSize: 40,
      }}
    >
      todos
    </Typography>

    <Box
      sx={{
        width: "100%",
        maxWidth: 540,
        maxHeight: 400,
        p: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        borderRadius: 3,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #d0e2dc",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="What needs to be done?"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                onClick={toggleAllTasks}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowDropDownIcon
                  sx={{ color: toggleAllActive ? "#2e7d32" : "#b0bec5" }}
                />
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" onClick={Copy}>
              <AssignmentIcon sx={{ color: "#43a047", "&:hover": {
                color:"#2e7d32",
              }}} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: -1,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#a5d6a7",
              borderWidth: "0.5px",
            },
            "&:hover fieldset": {
              borderColor: "#81c784",
              borderWidth: "0.5px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2e7d32",
              boxShadow: "0 0 0 1px #2e7d32",
              borderWidth: "0.5px",
            },
          },
          "& input": {
            fontSize: "1rem",
            padding: "12px 10px",
          },
        }}
      />

       <TodoList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editText={editText}
          setEditText={setEditText}
          editInput={editInput}
          setEditInput={setEditInput}
          updateTask={updateTask}
        />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={1.5}
        mt={1}
      >
  <Typography variant="body1" sx={{ color: "#616161" }}>
    {activeCount} items left
  </Typography>

  <Button
    variant={filter === "all" ? "contained" : "outlined"}
    onClick={() => setFilter("all")}
    sx={{
      textTransform: "none",
      color: filter === "all" ? "#fff" : "#2e7d32",
      backgroundColor: filter === "all" ? "#2e7d32" : "transparent",
      borderColor: "#2e7d32",
      "&:hover": {
        backgroundColor: "#66bb6a",
        color: "#fff",
        border: "none",
      },
      "&.Mui-focused, &:focus": {
        border: "none",
        outline: "none",
      },
    }}
  >
    All
  </Button>

  <Button
    variant={filter === "active" ? "contained" : "outlined"}
    onClick={() => setFilter("active")}
    sx={{
      textTransform: "none",
      color: filter === "active" ? "#fff" : "#2e7d32",
      backgroundColor: filter === "active" ? "#2e7d32" : "transparent",
      borderColor: "#2e7d32",
      "&:hover": {
        backgroundColor: "#66bb6a",
        color: "#fff",
        border: "none",
      },
      "&.Mui-focused, &:focus": {
        border: "none",
        outline: "none",
      },
    }}
  >
    Active
  </Button>

  <Button
    variant={filter === "completed" ? "contained" : "outlined"}
    onClick={() => setFilter("completed")}
    sx={{
      textTransform: "none",
      color: filter === "completed" ? "#fff" : "#2e7d32",
      backgroundColor: filter === "completed" ? "#2e7d32" : "transparent",
      borderColor: "#2e7d32",
      "&:hover": {
        backgroundColor: "#66bb6a",
        color: "#fff",
        border: "none",
      },
      "&.Mui-focused, &:focus": {
        border: "none",
        outline: "none",
      },
    }}
  >
    Completed
  </Button>

  <Button
    variant="outlined"
    color="error"
    onClick={clearCompleted}
    sx={{
      textTransform: "none",
      visibility: hasCompletedTasks ? "visible" : "hidden",
      "&:hover": {
        backgroundColor: "#e57373",
        color: "#fff",
        border: "none",
      },
      "&.Mui-focused, &:focus": {
        border: "none",
        outline: "none",
      },
    }}
  >
    Clear Completed
    </Button>
   </Box>
  </Box>
</Box>
  );
};

export default TodoApp;
