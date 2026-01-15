import { usePlanner } from "../context/PlannerContext.jsx";
import TaskItem from "./TaskItem.jsx";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WeekGrid() {
  const { state } = usePlanner();

   return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DAYS.map((day) => {
        const tasksForDay = state.tasks.filter((t) => t.day === day);

        return (
          <section
            key={day}
            className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
          >
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">{day}</h2>
              <span className="text-sm text-slate-500">
                {tasksForDay.length}
              </span>
            </header>

            <div className="mt-3 space-y-2">
              {tasksForDay.length === 0 ? (
                <p className="text-sm text-slate-500">No tasks</p>
              ) : (
                tasksForDay.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
