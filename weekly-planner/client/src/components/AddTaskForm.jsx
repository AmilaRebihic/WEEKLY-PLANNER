import { useState } from "react";
import { usePlanner } from "../context/PlannerContext.jsx";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; 

export default function AddTaskForm() {
  const { addTask, state } = usePlanner(); // Access planner context
  const [day, setDay] = useState("Mon"); // Default selected day
  const [text, setText] = useState(""); // Task text input

  async function onSubmit(e) {  // Handle form submission
    e.preventDefault(); // Prevent default form behavior
    if (!text.trim()) return;        // Do nothing if input is empty
    await addTask(day, text.trim());
    setText("");
  }

  return ( // Render the form
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
        >
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a task..."
          className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300"
        />

        <button
          type="submit"
          className="h-11 rounded-xl bg-slate-900 px-5 font-medium text-white hover:bg-slate-800 active:bg-slate-950"
        >
          Add
        </button>
      </form>

      {state.error && (
        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
          {state.error}
        </p>
      )}
    </div>
  );
}
