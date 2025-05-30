import React from "react";
import {
  List,
  ListItem,
  Checkbox,
  TextField,
  IconButton,
  Box,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import type { Props } from "./interfaces";

const TodoList: React.FC<Props> = ({
  tasks,
  toggleTask,
  deleteTask,
  editText,
  setEditText,
  editInput,
  setEditInput,
  updateTask,
}) => {
    return(  
  <List
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          flex: 1,
          mt: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
            maxHeight: 20,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: "#66bb6a",
          },
        }}
      >
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              borderBottom: "1px solid #f1f1f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "background-color 0.3s",
              '&:hover': {
                backgroundColor: "#f9f9f9",
              },
              '&:hover .delete-icon': {
                opacity: 1,
              },
            }}
          >
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                sx={{
                  color: "#2e7d32",
                  '&.Mui-checked': {
                    color: "#2e7d32",
                  },
                  visibility: editText === task.id ? "hidden" : "visible",
                  pointerEvents: editText === task.id ? "none" : "auto",
                  width: 40,
                }}
              />

              {editText === task.id ? (
                <TextField
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  onBlur={() => setEditText(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTask({ id: task.id, text: editInput });
                    } else if (e.key === "Escape") {
                      setEditInput("");
                    }
                  }}
                  autoFocus
                  variant="outlined"
                  fullWidth
                  sx={{
                    fontSize: "1rem",
                    color: "#333",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                        borderWidth: "1.5px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#66bb6a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2e7d32",
                        boxShadow: "none",
                        borderWidth: "1px",
                      },
                    },
                  }}
                />
              ) : (
                <ListItemText
                  primary={task.text}
                  onDoubleClick={() => {
                    setEditText(task.id);
                    setEditInput(task.text);
                  }}
                  sx={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#9e9e9e" : "#333",
                    cursor: "pointer",
                  }}
                />
              )}
            </Box>

            {editText !== task.id && (
              <Box
                className="delete-icon"
                sx={{
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              >
                <IconButton
                  edge="end"
                  onClick={() => deleteTask(task.id)}
                  sx={{
                    padding: 1,
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  <CloseIcon
                    sx={{
                      color: "#ef5350",
                      fontSize: 20,
                      "&:hover": {
                        color: "#d32f2f",
                      },
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
    );

}
export default TodoList;
