//detta är hjärtat i appen
 import { createContext, useContext, useReducer, useEffect } from "react";
 import { getTasks, createTask, toggleTask, deleteTask } from "../API/tasks.jsx";

 //skapar context, som vi kan använda i hela appen

 const PlannerContext = createContext(null);
//används för att få tillgång till context i komponenter

//skapar en context hook
const initialState = {
    tasks: [], //alla tasks från backend
    loading: false, //används vid fetch
    error: null, //om något går fel vid fetch
};
/**
 * 3️⃣ Reducer
 * En reducer tar:
 * - nuvarande state
 * - action (vad som hände)
 * och returnerar NYTT state
 */
function plannerReducer(state, action) {
    switch (action.type) {
        case "LOAD_START":
            return { ...state, loading: true, error: null };
        case "LOAD_SUCCESS":
            return { ...state, loading: false, tasks: action.payload };
        case "LOAD_ERROR":
            return { ...state, loading: false, error: action.payload };
            case "ADD_TASK":
  // Lägg den nya tasken först i listan (så den syns högst upp)
  return { ...state, tasks: [action.payload, ...state.tasks] };

case "TOGGLE_TASK":
  // Byt ut tasken som matchar id mot den uppdaterade från backend
  return {
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === action.payload.id ? action.payload : t
    ),
  };

case "DELETE_TASK":
  // Filtrera bort tasken som ska tas bort
  return {
    ...state,
    tasks: state.tasks.filter((t) => t.id !== action.payload),
  };

        default:
            return state;
}
}
/**
 * 4️⃣ Provider-komponenten
 * Det är denna som "äger" state
 * och gör det tillgängligt för barn-komponenter
 */
export function PlannerProvider({ children }) {
    const [state, dispatch] = useReducer(plannerReducer, initialState);
    //hämtar tasks från backend när komponenten mountas

  /**
   * 5️⃣ useEffect – laddar data EN GÅNG när appen startar
   * Här sker kopplingen:
   * React → getTasks() → fetch → backend → SQLite
   */
  useEffect(() => {
    async function loadTasks() {
        dispatch({ type: "LOAD_START" });
        try {
        const data = await getTasks(); // <-- fetch sker här
        dispatch({ type: "LOAD_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "LOAD_ERROR", payload: err.message });
      }
    }
    loadTasks();
}, []); //tom array = kör EN GÅNG vid mount

    // Skapar en task i backend och uppdaterar state
async function addTask(day, text) {
  try {
    const created = await createTask(day, text);
    dispatch({ type: "ADD_TASK", payload: created });
  } catch (err) {
    dispatch({ type: "LOAD_ERROR", payload: err.message });
  }
}

// Toggle done i backend och uppdaterar state med uppdaterad task
async function toggle(id) {
  try {
    const updated = await toggleTask(id);
    dispatch({ type: "TOGGLE_TASK", payload: updated });
  } catch (err) {
    dispatch({ type: "LOAD_ERROR", payload: err.message });
  }
}

// Tar bort i backend och uppdaterar state lokalt
async function remove(id) {
  try {
    await deleteTask(id);
    dispatch({ type: "DELETE_TASK", payload: id });
  } catch (err) {
    dispatch({ type: "LOAD_ERROR", payload: err.message });
  }
}

    return (
  <PlannerContext.Provider value={{ state, dispatch, addTask, toggle, remove }}>
    {children}
  </PlannerContext.Provider>
);

}


 // 6️⃣ Custom hook för att använda context
 // gör det enklare att få tillgång till context i komponenter
  export function usePlanner() {
    const context = useContext(PlannerContext);
    if (!context) {
        throw new Error("usePlanner must be used within a PlannerProvider");
    }
    return context;

}



        
    

 