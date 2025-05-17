// App.js
import React, { useState } from 'react';

export default function KanbanBoard() {
  // 1️⃣ State holds our tasks and the currently dragged task
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Set up project', status: 'todo' },
    { id: 2, text: 'Build UI', status: 'inprogress' },
    { id: 3, text: 'Write tests', status: 'done' },
  ]);
  const [draggedTask, setDraggedTask] = useState(null);

  // 2️⃣ Drag handlers
  const onDragStart = (task) => setDraggedTask(task);
  const onDragOver = (e) => {
    e.preventDefault(); // allows drop
  };
  const onDrop = (newStatus) => {
    setTasks(tasks.map(t =>
      t.id === draggedTask.id ? { ...t, status: newStatus } : t
    ));
    setDraggedTask(null);
  };

  // 3️⃣ Task item component
  function Task({ task }) {
    return (
      <div
        draggable
        onDragStart={() => onDragStart(task)}
        style={{
          padding: '8px',
          margin: '4px 0',
          border: '1px solid #333',
          borderRadius: '4px',
          backgroundColor: '#f4f4f4',
          cursor: 'grab'
        }}
      >
        {task.text}
      </div>
    );
  }

  // 4️⃣ Render three columns
  const columns = [
    { key: 'todo',       title: 'To Do' },
    { key: 'inprogress', title: 'In Progress' },
    { key: 'done',       title: 'Done' },
  ];

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '16px' }}>
      {columns.map(col => (
        <div
          key={col.key}
          onDragOver={onDragOver}
          onDrop={() => onDrop(col.key)}
          style={{
            flex: 1,
            minHeight: '200px',
            padding: '8px',
            border: '2px solid #666',
            borderRadius: '6px',
            backgroundColor: '#fafafa'
          }}
        >
          <h3 style={{ textAlign: 'center' }}>{col.title}</h3>

          {tasks.filter(t => t.status === col.key).length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888' }}>No tasks</p>
          ) : (
            tasks
              .filter(t => t.status === col.key)
              .map(t => <Task key={t.id} task={t} />)
          )}
        </div>
      ))}
    </div>
  );
}
