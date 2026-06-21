import React, { useState } from 'react';

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Type your task here.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="new-task-input"
        className="flex-1 rounded-md border border-gray-200 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 shadow-sm"
      />
      <button
        type="submit"
        data-testid="add-task-submit-btn"
        className="bg-black text-white px-6 py-3 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
      >
        <span>+</span> Add
      </button>
    </form>
  );
}
