import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className="bg-white rounded-md p-4 mb-3 flex items-center shadow-sm border border-gray-100"
      data-testid={`task-item-${task.id}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        data-testid={`task-checkbox-${task.id}`}
        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black mr-4 cursor-pointer accent-black"
      />
      <span
        data-testid={`task-text-${task.id}`}
        className={`flex-1 text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
      >
        {task.text}
      </span>
      <div className="flex items-center gap-4">
        <button
          className="text-gray-400 hover:text-black transition-colors"
          data-testid={`edit-task-btn-${task.id}`}
          aria-label="Edit task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          data-testid={`delete-task-btn-${task.id}`}
          aria-label="Delete task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </li>
  );
}
