

//nu kopllar jag front end till backend

const BASE = "http://localhost:4000/api/tasks";

//Hämtar alla tasks
export async function getTasks() {
    const res = await fetch(BASE);
    return res.json();
}

//skapar en ny task

export async function createTask(day, text) {
    const res = await fetch(BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"  },
        body: JSON.stringify({ day, text }),
    });
    const data = await res.json();


  if (!res.ok) {
    throw new Error(data.error || "Could not create task");
  }

  return data; // <-- riktig task
}
   
export async function toggleTask(id) {
  const res = await fetch(`${BASE}/${id}/toggle`, { method: "PATCH" });
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Could not toggle task");
  return data;
}
    //Tar bort en task
    export async function deleteTask(id) {
        await fetch(`${BASE}/${id}`, {
            method: "DELETE",
        });
    }

    


