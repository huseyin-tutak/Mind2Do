import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim(), priority });
    setText('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-3">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yeni bir görev ekle..."
          className="w-full pl-6 pr-16 py-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-slate-100 transition-all shadow-inner"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <PlusCircle size={24} />
        </button>
      </div>

      <div className="flex items-center gap-3 px-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Öncelik:</span>
        <div className="flex gap-2">
          {['low', 'medium', 'high'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                priority === p 
                  ? p === 'high' ? 'bg-red-500 text-white border-red-500 shadow-md shadow-red-500/30' 
                  : p === 'medium' ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/30' 
                  : 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/30'
                  : 'bg-transparent text-slate-500 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
              }`}
            >
              {p === 'low' ? 'Düşük' : p === 'medium' ? 'Orta' : 'Yüksek'}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
