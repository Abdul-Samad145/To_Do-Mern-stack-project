import { useEffect, useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setTitle(todo.title);
      setDescription(todo.description || "");
    }
  }, [todo, isEditing]);

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(todo._id, { title, description });
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900"
          />
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                />
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <p className={`text-base font-semibold ${todo.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                  {todo.title}
                </p>
                {todo.description ? (
                  <p className="mt-1 text-sm text-slate-600">{todo.description}</p>
                ) : null}
              </div>
            )}
          </div>
        </label>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !title.trim()}
                className="w-full rounded-md bg-emerald-600 px-3 py-2 text-sm text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 sm:w-auto"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-1">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(todo._id)}
                className="rounded-md border border-rose-200 px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
