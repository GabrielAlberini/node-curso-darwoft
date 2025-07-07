import "dotenv/config"
import express from "express"
import { connect } from "./config/mongoConnect";
import { taskRouter } from "./routes/taskRouter";
import { authRouter } from "./routes/authRouter"

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/tasks", taskRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha por el puerto http://localhost:${PORT}`)
  connect()
})