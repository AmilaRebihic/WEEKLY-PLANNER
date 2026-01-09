import express from 'express';
import cors from "cors";
import db from './db.js';

const app = express();
const PORT = 4000;

/**
 * Middleware
 * - cors(): gör att frontend (React) får anropa backend
 * - express.json(): gör att vi kan läsa JSON från POST/PATCH requests
 */
app.use(cors());
app.use(express.json());

/**
 * Hälsocheck: snabbt test att servern kör
 */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

/**
 * GET /api/tasks
 * Hämtar alla tasks från databasen
 */
app.get("/api/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks ORDER BY createdAt DESC").all();
    res.json(tasks);
});

/**
 * POST /api/tasks
 * Skapar ny task
 * Body: { day: "Mon", text: "Buy milk" }
 */

app.post("/api/tasks", (req, res) => {
    const { day, text } = req.body;

    //Validering: stoppa tömma värden
    if (!day || !text || text.trim()){
        return res.status(400).json({ error: "Day and text are required" });
    } 
    const stmt = db.prepare("INSERT INTO tasks (day, text, createdAt) VALUES (?, ?, ?)");
    const info = stmt.run(day, text.trim(), new Date().toISOString());

    //Hämta och returnera skapade raden

    const created = db.prepare("SELECT * FROM tasks WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json(created);
});


/**
 * PATCH /api/tasks/:id/toggle
 * Toggle done 0 <-> 1  Patch används när vi uppdaterar en del av en resurs
 */
app.patch("/api/tasks/:id/toggle", (req, res) => {
    const id = Number(req.params.id);

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    const newDone = task.done ? 0 : 1; 
    db.prepare("UPDATE tasks SET done = ? WHERE id = ?").run(newDone, id);

    const updated = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    res.json(updated);
});

/**
 * DELETE /api/tasks/:id
 * Tar bort tasken
 */
app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
    res.status(204).send();
});
app.listen(PORT, () => {
  console.log(`✅ API running: http://localhost:${PORT}`);
});