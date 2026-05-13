import { useState } from 'react'
import './AddTodo.css'

export default function AddTodo({ onAdd }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedInput = input.trim()
    if (trimmedInput) {
      onAdd(trimmedInput)
      setInput('')
    }
  }

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
          maxLength={100}
        />
        <button type="submit" className="add-btn">
          <span>+</span> Add
        </button>
      </div>
    </form>
  )
}
