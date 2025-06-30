// validar el método http -> acción por sobre la entidad
// validar el endpoint

import { Router } from "express"
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/tasksControllers"
import { authMiddleware } from "../middlewares/auth"

const taskRouter = Router()

// TODAS LAS QUERIES QUE LLEGAN ACÁ COMIENZAN CON "/api/tasks"

// obtener todas las tareas
taskRouter.get("/", authMiddleware, getAllTasks)
taskRouter.post("/", authMiddleware, createTask)
taskRouter.patch("/:id", authMiddleware, updateTask)
taskRouter.delete("/:id", authMiddleware, deleteTask)

export { taskRouter }

