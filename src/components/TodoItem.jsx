import { useState } from 'react'
import './TodoItem.css'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)

  const handleEdit = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue.trim())
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEdit()
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditValue(todo.title)
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleEdit}
            className="todo-edit-input"
            autoFocus
          />
        ) : (
          <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
            {todo.title}
          </span>
        )}
      </div>
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              title="Edit"
            >
              ✎
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="delete-btn"
              title="Delete"
            >
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  )
}
