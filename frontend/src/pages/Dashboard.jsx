import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem.jsx";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", description: "" });
  const [creating, setCreating] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    setCreating(true);
    setError("");
    try {
      const todo = await createTodo({
        title: form.title.trim(),
        description: form.description.trim()
      });
      setTodos((prev) => [todo, ...prev]);
      setForm({ title: "", description: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create todo.");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      const updated = await updateTodo(id, payload);
      setTodos((prev) => prev.map((todo) => (todo._id === id ? updated : todo)));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update todo.");
    }
  };

  const handleToggle = async (todo) => {
    await handleUpdate(todo._id, { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete todo.");
    }
  };

  return (
    <main className="page-fade mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome, {user?.name}</h1>
        <p className="mt-1 text-sm text-slate-600">
          Keep track of your priorities and mark them off as you go.
        </p>

        <form onSubmit={handleCreate} className="mt-6 grid gap-4 md:grid-cols-[2fr_3fr_auto]">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="New task title"
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional description"
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={creating}
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {creating ? "Adding..." : "Add"}
          </button>
        </form>
        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Your tasks</h2>
          <span className="text-sm text-slate-500">{todos.length} total</span>
        </div>

        {loading ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            Loading tasks...
          </div>
        ) : todos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            No tasks yet. Add your first to-do above.
          </div>
        ) : (
          <div className="stagger grid gap-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
