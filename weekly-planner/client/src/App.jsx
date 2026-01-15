import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import AddTaskForm from "./components/AddTaskForm";
import WeekGrid from "./components/WeekGrid";


import { usePlanner } from "./context/PlannerContext.jsx";


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        Sedmicni Planer
        </h1>
        <p className="mt-2 text-slate-600">
          Planiraj sedmicu unaprijed i prati svoje zadatke!
        </p>

        <div className="mt-6">
          <AddTaskForm />
        </div>

        <div className="mt-6">
          <WeekGrid />
        </div>
      </div>
    </div>
  );
}
