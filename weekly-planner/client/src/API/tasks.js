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
    return res.json();
}
   /** Toggle done */
export async function toggleTask(id) {
  const res = await fetch(`${BASE}/${id}/toggle`, { method: "PATCH" });
  return res.json();
}
    //Tar bort en task
    export async function deleteTask(id) {
        await fetch(`${BASE}/${id}`, {
            method: "DELETE",
        });
    }

    


