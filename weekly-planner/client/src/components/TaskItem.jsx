import { usePlanner } from "../context/PlannerContext";

export default function TaskItem({ task }) {
  const { toggle, remove } = usePlanner();

  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
      <button
        onClick={() => toggle(task.id)}
        className={`h-6 w-6 rounded-md ring-1 ring-slate-300 ${
          task.done ? "bg-slate-900" : "bg-white"
        }`}
        aria-label="Toggle done"
        title="Toggle done"
      />

      <p
        className={`flex-1 text-sm ${
          task.done ? "text-slate-400 line-through" : "text-slate-900"
        }`}
      >
        {task.text}
      </p>

      <button
        onClick={() => remove(task.id)}
        className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
        aria-label="Delete"
        title="Delete"
      >
        🗑️
      </button>
    </div>
  );
}
