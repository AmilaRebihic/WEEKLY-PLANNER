//detta är hjärtat i appen
 import { createContext, useContext, useReducer, useEffect } from "react";
 import { getTasks } from "./API/tasks.js";

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

    }
    return ( 
        <PlannerContext.Provider value={{ state, dispatch }}>
            {children}
        </PlannerContext.Provider>
    );

 // 6️⃣ Custom hook för att använda context
 // gör det enklare att få tillgång till context i komponenter
  export function usePlanner() {
    const context = useContext(PlannerContext);
    if (!context) {
        throw new Error("usePlanner must be used within a PlannerProvider");
    }
    return context;

}



        
    

 