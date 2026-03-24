import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4 opacity-50">📝</div>
        <p className="text-slate-500 dark:text-slate-400">Henüz hiç görev eklenmedi. Haydi başlayalım!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
