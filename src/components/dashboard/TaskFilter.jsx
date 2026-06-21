import React from 'react';

export default function TaskFilter({ filter, setFilter, count }) {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div className="flex justify-between items-center mb-6 text-sm">
      <div className="flex gap-1 text-gray-500">
        {filters.map((f, index) => (
          <React.Fragment key={f}>
            <button
              onClick={() => setFilter(f)}
              data-testid={`filter-${f.toLowerCase()}-btn`}
              className={`${filter === f ? 'text-black font-semibold' : 'hover:text-black'} px-1`}
            >
              {f}
            </button>
            {index < filters.length - 1 && <span className="text-gray-300 mx-1">|</span>}
          </React.Fragment>
        ))}
      </div>
      <span className="text-gray-500 text-xs" data-testid="task-count">
        {count} {Math.abs(count) === 1 ? 'task' : 'tasks'} left
      </span>
    </div>
  );
}
