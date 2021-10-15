import React, { useState, useEffect} from 'react';
import { TextField, Button, Checkbox, Typography, Paper } from '@material-ui/core';
import classes from "./ToDoComponentStyles.scss";

export const ToDoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEdit, setTodoEdit] = useState(null);
  const [editingText, setEditingText] = useState("");
  
  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    };
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }; 

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    
    setTodos(updatedTodos);
  }

  const isCompleted = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }; 

      return todo;
    })

    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.text = editingText;
      };

      return todo;
    });

    setTodos(updatedTodos);
    setTodoEdit(null);
    setEditingText("");
  };

  return(
    <>
      <div className={classes.wrapper}>
        <div className="container-fluid">
          <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-1">
              <TextField 
                type="text" 
                onChange={(e) => setTodo(e.target.value)} 
                value={todo}
              />     
            </div>
            <div className="col-sm-1">            
              <Button 
                type="submit"
                size="small"
              >Add ToDo</Button>
            </div>     
          </div>
          </form>
          {todos.map((todo) => (
            <div key={todo.id}>
              {todoEdit === todo.id ? (
                <TextField 
                  type="text" 
                  onChange={(e) => setEditingText(e.target.value)} 
                  value={editingText}
                />  ) : (
                <div><Typography>{todo.text}</Typography></div>
              )}
              <Button 
                type="submit"
                variant="outlined" 
                onClick={() => deleteTodo(todo.id)}
              >&#128465;</Button>
              <Checkbox 
                onChange={() => isCompleted(todo.id)} 
                checked={todo.completed}
              />
              {todoEdit === todo.id ? (
                <Button 
                  type="submit"
                  variant="outlined" 
                  onClick={() => editTodo(todo.id)}
                >Submit Edit</Button>
              ) : (
                <Button 
                  type="submit"
                  variant="outlined" 
                  onClick={() => setTodoEdit(todo.id)}
                >Edit ToDo</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}