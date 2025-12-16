// backend/src/index.js
const express = require("express");
const bodyParser = require("body-parser");
const { pool, initDb } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Obtener todos los items
app.get("/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM items ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error en GET /items:", err);
    res.status(500).json({ error: "Error interno" });
  }
});

// Crear un item nuevo
app.post("/items", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "name es requerido" });
    }
    const result = await pool.query(
      "INSERT INTO items (name) VALUES ($1) RETURNING id, name",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error en POST /items:", err);
    res.status(500).json({ error: "Error interno" });
  }
});

// Arrancar servidor
(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`API escuchando en puerto ${PORT} ✅`);
    });
  } catch (err) {
    console.error("Error iniciando la app:", err);
    process.exit(1);
  }
})();
