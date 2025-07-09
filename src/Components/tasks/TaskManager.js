import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function TaskManager() {
  const { user } = useContext(AuthContext);
  const userId = user?.id; 

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editStatus, setEditStatus] = useState('pending');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/tasks?userId=${userId}`)
        .then(res => setTasks(res.data));
    }
  }, [userId]);

  const addTask = async (task) => {
    const res = await axios.post('http://localhost:5000/tasks', { ...task, userId });
    setTasks([...tasks, res.data]);
  };

  const updateTask = async (id, updates) => {
    const res = await axios.patch(`http://localhost:5000/tasks/${id}`, updates);
    setTasks(tasks.map(t => t.id === id ? res.data : t));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    addTask({
      text: taskInput.trim(),
      status: 'pending',
      dueDate: dueDate || ''
    });
    setTaskInput('');
    setDueDate('');
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleEditTask = (idx) => {
    setEditIndex(idx);
    setEditValue(tasks[idx].text);
    setEditDueDate(tasks[idx].dueDate || '');
    setEditStatus(tasks[idx].status || 'pending');
  };

  const handleSaveEdit = (idx) => {
    const id = tasks[idx].id;
    updateTask(id, { text: editValue, dueDate: editDueDate, status: editStatus });
    setEditIndex(null);
    setEditValue('');
    setEditDueDate('');
    setEditStatus('pending');
  };

  const handleStatusChange = (idx, status) => {
    const id = tasks[idx].id;
    updateTask(id, { status });
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const dueTasks = tasks.filter(task => task.status === 'due');

  if (!userId) {
    return <div>Please log in to manage your tasks.</div>;
  }

  return (
    <div style={{
      background: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      minWidth: '320px',
      maxWidth: '400px'
    }}>
      <h2 style={{ color: '#1976d2', textAlign: 'center' }}>My Tasks</h2>
      <form onSubmit={handleAddTask} style={{ display: 'flex', marginBottom: '1rem', gap: '0.5rem' }}>
        <input
          type="text"
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          style={{
            flex: 2,
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button type="submit" style={{
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Add
        </button>
      </form>

      {/* Pending Tasks */}
      <h3 style={{ color: '#1976d2', marginTop: '1.5rem' }}>Pending</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pendingTasks.length === 0 && <li style={{ color: '#888' }}>No pending tasks.</li>}
        {pendingTasks.map((task, idx) => {
          // Find the index in the original tasks array
          const realIdx = tasks.findIndex(t => t === task);
          return (
            <li key={realIdx} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
              gap: '0.5rem'
            }}>
              {editIndex === realIdx ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    style={{
                      flex: 2,
                      padding: '0.3rem',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={e => setEditDueDate(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.3rem',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                  <select
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.3rem',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="due">Due</option>
                  </select>
                  <button onClick={() => handleSaveEdit(realIdx)} style={{
                    background: '#388e3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.3rem 0.7rem',
                    cursor: 'pointer'
                  }}>Save</button>
                </>
              ) : (
                <>
                  <span style={{ flex: 2 }}>{task.text}</span>
                  <span style={{
                    flex: 1,
                    color: '#1976d2',
                    fontWeight: 'bold'
                  }}>
                    Pending
                  </span>
                  <span style={{ flex: 1, fontSize: '0.95em', color: '#888' }}>
                    {task.dueDate}
                  </span>
                  <select
                    value={task.status}
                    onChange={e => handleStatusChange(realIdx, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.3rem',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="due">Due</option>
                  </select>
                  <button onClick={() => handleEditTask(realIdx)} style={{
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.3rem 0.7rem',
                    cursor: 'pointer'
                  }}>Edit</button>
                  <button onClick={() => handleDeleteTask(realIdx)} style={{
                    background: '#d32f2f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.3rem 0.7rem',
                    cursor: 'pointer'
                  }}>Delete</button>
                </>
              )}
            </li>
          );
        })}
      </ul>

      {/* Completed Tasks */}
      <h3 style={{ color: '#388e3c', marginTop: '1.5rem' }}>Completed</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {completedTasks.length === 0 && <li style={{ color: '#888' }}>No completed tasks.</li>}
        {completedTasks.map((task, idx) => {
          const realIdx = tasks.findIndex(t => t === task);
          return (
            <li key={realIdx} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
              gap: '0.5rem'
            }}>
              <span style={{ flex: 2, textDecoration: 'line-through' }}>{task.text}</span>
              <span style={{
                flex: 1,
                color: '#388e3c',
                fontWeight: 'bold'
              }}>
                Completed
              </span>
              <span style={{ flex: 1, fontSize: '0.95em', color: '#888' }}>
                {task.dueDate}
              </span>
              <button onClick={() => handleDeleteTask(realIdx)} style={{
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.3rem 0.7rem',
                cursor: 'pointer'
              }}>Delete</button>
            </li>
          );
        })}
      </ul>

      {/* Due Tasks */}
      <h3 style={{ color: '#d32f2f', marginTop: '1.5rem' }}>Due</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dueTasks.length === 0 && <li style={{ color: '#888' }}>No due tasks.</li>}
        {dueTasks.map((task, idx) => {
          const realIdx = tasks.findIndex(t => t === task);
          return (
            <li key={realIdx} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
              gap: '0.5rem'
            }}>
              <span style={{ flex: 2 }}>{task.text}</span>
              <span style={{
                flex: 1,
                color: '#d32f2f',
                fontWeight: 'bold'
              }}>
                Due
              </span>
              <span style={{ flex: 1, fontSize: '0.95em', color: '#888' }}>
                {task.dueDate}
              </span>
              <button onClick={() => handleDeleteTask(realIdx)} style={{
                background: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.3rem 0.7rem',
                cursor: 'pointer'
              }}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TaskManager;
