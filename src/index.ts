// punto de entrada al sistema
// levantar la base de datos
// levantar el servidor http

import express from "express"
import { connect } from "./config/mongoConnect";
import { taskRouter } from "./routes/taskRouter";
process.loadEnvFile()

const tasks = [
  {
    _id: "665d1c95f8a4b6a1f0c1a1a1",
    text: "Comprar leche",
    completed: false,
    userId: "665d1c95f8a4b6a1f0c1b2b2",
    createdAt: new Date("2024-06-01T10:00:00Z"),
    updatedAt: new Date("2024-06-01T10:00:00Z")
  },
  {
    _id: "665d1c95f8a4b6a1f0c1a1a2",
    text: "Estudiar Node.js",
    completed: true,
    userId: "665d1c95f8a4b6a1f0c1b2b2",
    createdAt: new Date("2024-06-02T12:30:00Z"),
    updatedAt: new Date("2024-06-02T14:00:00Z")
  },
  {
    _id: "665d1c95f8a4b6a1f0c1a1a3",
    text: "Pasear al perro",
    completed: false,
    userId: "665d1c95f8a4b6a1f0c1c3c3",
    createdAt: new Date("2024-06-03T08:15:00Z"),
    updatedAt: new Date("2024-06-03T08:15:00Z")
  },
  {
    _id: "665d1c95f8a4b6a1f0c1a1a4",
    text: "Hacer la compra semanal",
    completed: true,
    userId: "665d1c95f8a4b6a1f0c1c3c3",
    createdAt: new Date("2024-06-04T16:45:00Z"),
    updatedAt: new Date("2024-06-04T18:00:00Z")
  },
  {
    _id: "665d1c95f8a4b6a1f0c1a1a5",
    text: "Enviar informe final",
    completed: false,
    userId: "665d1c95f8a4b6a1f0c1d4d4",
    createdAt: new Date("2024-06-05T09:00:00Z"),
    updatedAt: new Date("2024-06-05T09:00:00Z")
  }
];

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(express.json())

// quiero todas las tareas -> GET - http://localhost:3000/api/tasks

app.use("/api/tasks", taskRouter)

// Entidad auth
// app.post("/api/auth/login", () => { })
// app.post("/api/auth/register", () => { })

app.listen(PORT, () => {
  console.log("✅ Servidor en escucha por el puerto 3000")
  connect()
})