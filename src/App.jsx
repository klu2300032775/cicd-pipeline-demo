import { useState } from 'react'
import './App.css'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'

export default function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date()
    }
    setTodos([newTodo, ...todos])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newTitle) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ))
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝  Saandeep WorkSpace </h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{todos.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{todos.length - completedCount}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <AddTodo onAdd={addTodo} />

        <div className="todos-container">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet! Add one to get started.</p>
            </div>
          ) : (
            <div className="todos-list">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
