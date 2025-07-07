import "dotenv/config"
import express from "express"
import { connect } from "./config/mongoConnect";
import { taskRouter } from "./routes/taskRouter";
import { authRouter } from "./routes/authRouter"
import cors from "cors"

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/tasks", taskRouter)

app.use("/api", (req, res) => {
  res.status(404).json({
    message: "Not found"
  })
})

app.use((req, res) => {
  res.json({
    status: 200,
    tasks: "/api/tasks"
  })
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha por el puerto http://localhost:${PORT}`)
  connect()
})