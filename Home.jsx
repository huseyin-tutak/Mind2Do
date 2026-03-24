import { useState, useEffect, useMemo } from 'react';
import { Trash2, ChevronLeft, ChevronRight, Calendar as CalendarIcon, CalendarDays } from 'lucide-react';
import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [selectedDateStr, setSelectedDateStr] = useState(() => new Date().toLocaleDateString('en-CA'));
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text: todoData.text,
      priority: todoData.priority || 'medium',
      completed: false,
      date: selectedDateStr,
      createdAt: new Date().toISOString()
    };
    setTodos([newTodo, ...todos]);
  };

  const clearDailyCompleted = () => { // Fixed name, was clearCompleted in previous prompt
    if (window.confirm('Bu güne ait tamamlanan görevleri silmek istediğinize emin misiniz?')) {
      const dailyCompletedIds = todos.filter(t => (t.date || t.createdAt.split('T')[0]) === selectedDateStr && t.completed).map(t => t.id);
      setTodos(todos.filter(todo => !dailyCompletedIds.includes(todo.id)));
    }
  };

  const dailyTodos = useMemo(() => {
    return todos.filter(t => (t.date || t.createdAt.split('T')[0]) === selectedDateStr);
  }, [todos, selectedDateStr]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return dailyTodos.filter(t => !t.completed);
      case 'completed': return dailyTodos.filter(t => t.completed);
      default: return dailyTodos;
    }
  }, [dailyTodos, filter]);

  const stats = {
    total: dailyTodos.length,
    active: dailyTodos.filter(t => !t.completed).length,
    completed: dailyTodos.filter(t => t.completed).length
  };

  const changeDate = (days) => {
    const d = new Date(selectedDateStr);
    d.setDate(d.getDate() + days);
    setSelectedDateStr(d.toLocaleDateString('en-CA'));
  };

  const isToday = selectedDateStr === new Date().toLocaleDateString('en-CA');
  
  const displayDateStr = new Date(selectedDateStr).toLocaleDateString('tr-TR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden mt-10 p-6 border border-white/20">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-3 tracking-tight">
          Mind 2 Do
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center justify-between w-full bg-slate-50 dark:bg-slate-700/50 p-3 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-600">
          <button onClick={() => changeDate(-1)} className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl shadow-sm transition-colors text-slate-500 hover:text-purple-500">
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex flex-col items-center relative group">
            <input 
              type="date" 
              value={selectedDateStr}
              onChange={(e) => setSelectedDateStr(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className={`text-xs font-bold uppercase tracking-wider mb-1 px-2 py-0.5 rounded-full ${isToday ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-slate-300'}`}>
              {isToday ? 'Bugün' : 'Planlanan Gün'}
            </span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-colors group-hover:text-purple-500">
              <CalendarDays size={18} className="text-slate-400 group-hover:text-purple-400" />
              {displayDateStr}
            </span>
          </div>

          <button onClick={() => changeDate(1)} className="p-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl shadow-sm transition-colors text-slate-500 hover:text-purple-500">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <TodoForm onAdd={addTodo} />
      
      {dailyTodos.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl shadow-inner gap-4 border border-slate-100 dark:border-slate-700">
          <div className="flex bg-white dark:bg-slate-700 p-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'all' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
            >
              Tümü ({stats.total})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'active' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
            >
              Devam Eden ({stats.active})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${filter === 'completed' ? 'bg-green-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
            >
              Tamamlanan ({stats.completed})
            </button>
          </div>
          
          {stats.completed > 0 && (
            <button
              onClick={clearDailyCompleted}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-all w-full sm:w-auto justify-center sm:justify-start"
            >
              <Trash2 size={16} />
              <span>Tamamlananları Temizle</span>
            </button>
          )}
        </div>
      )}

      <div className="mt-8">
        <TodoList 
          todos={filteredTodos} 
          onToggle={toggleComplete} 
          onDelete={deleteTodo} 
          onUpdate={updateTodo} 
        />
      </div>
    </div>
  );
}
