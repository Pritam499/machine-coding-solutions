import React, { useState } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    if (editId !== null) {
      // edit existing
      setTodos(
        todos.map(todo =>
          todo.id === editId ? { ...todo, text } : todo
        )
      );
      setEditId(null);
    } else {
      // add new
      setTodos([...todos, { id: Date.now(), text }]);
    }
    setInput('');
  };

  const handleEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    setInput(todo.text);
    setEditId(id);
  };

  const handleRemove = (id) => {
    setTodos(todos.filter(t => t.id !== id));
    if (editId === id) {
      setEditId(null);
      setInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleAddOrEdit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter todo"
        />
        <button type="submit">
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </form>

      {todos.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.text}{' '}
              <button onClick={() => handleEdit(todo.id)}>Edit</button>{' '}
              <button onClick={() => handleRemove(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
