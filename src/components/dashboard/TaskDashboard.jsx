import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskInput from './TaskInput';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Map MongoDB _id to id for the frontend components
          const mappedTasks = data.map(t => ({ id: t._id, text: t.text, completed: t.completed }));
          setTasks(mappedTasks);
        } else {
          // Token might be invalid
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [navigate]);

  const addTask = async (text) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const data = await res.json();
        setTasks([{ id: data._id, text: data.text, completed: data.completed }, ...tasks]);
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleTask = async (id) => {
    const taskToToggle = tasks.find(t => t.id === id);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !taskToToggle.completed })
      });
      if (res.ok) {
        setTasks(
          tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      }
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true; // 'All'
  });

  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="max-w-2xl mx-auto w-full mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10" data-testid="dashboard-title">
        My Tasks
      </h2>
      <TaskInput onAdd={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} count={activeCount} />
      <TaskList 
        tasks={filteredTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
      />
    </div>
  );
}
