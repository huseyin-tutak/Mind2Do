import { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim() && editText !== todo.text) {
      onUpdate(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
      todo.completed 
        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700 opacity-60' 
        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md'
    }`}>
      <div className="flex items-center flex-1 gap-3 sm:gap-4">
        <div className={`w-1.5 h-10 rounded-full flex-shrink-0 shadow-sm ${todo.priority === 'high' ? 'bg-red-500 shadow-red-500/30' : todo.priority === 'low' ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-amber-500 shadow-amber-500/30'}`} title={`Öncelik: ${todo.priority === 'high' ? 'Yüksek' : todo.priority === 'low' ? 'Düşük' : 'Orta'}`}></div>
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-slate-300 dark:border-slate-500 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
          }`}
        >
          {todo.completed && <Check size={14} className="text-white" />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 border-b-2 border-purple-500 focus:outline-none text-slate-800 dark:text-slate-100 rounded-t-sm"
          />
        ) : (
          <span 
            className={`flex-1 transition-all ${
              todo.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 p-2 rounded-lg transition-colors"
            >
              <Save size={18} />
            </button>
            <button
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(false);
              }}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 p-2 rounded-lg transition-colors"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
