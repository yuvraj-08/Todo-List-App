import './style.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    if (newTodoTitle.trim() === '') return;

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: newTodoTitle,
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => setTodos([...todos, data]));

    setNewTodoTitle('');
  };

  const handleUpdateTodo = (id, newTitle) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: newTitle,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      setTodos(updatedTodos);
    });
  };

  const handleDeleteTodo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    });
  };

  return (
    <div className="container">
      <div className="App">
        <h1>TO-DO List</h1>
        <form>
          <input
            type="text"
            placeholder="Enter a new TO-DO"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button className="Add-Button" type="button" onClick={handleAddTodo}>
            Add
          </button>
        </form>
        <div className="divider">
          <hr></hr>
          <span>X</span>
          <hr></hr>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className="to-do-title-container">{todo.title}</div>
              <div className="button-container">
                <button
                  onClick={() => handleUpdateTodo(todo.id, 'Updated Title')}
                >
                  Update
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        Copyright &copy; 2023 | All Rights Reserved -{' '}
        <a target="_blank" href="https://beacons.ai/yuvraj08">
          Yuvraj Singh
        </a>
      </footer>
    </div>
  );
}

export default App;
