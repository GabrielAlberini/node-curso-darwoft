// validar el método http -> acción por sobre la entidad
// validar el endpoint

import { Router } from "express"
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/tasksControllers"

const taskRouter = Router()

// TODAS LAS QUERIES QUE LLEGAN ACÁ COMIENZAN CON "/api/tasks"

// obtener todas las tareas
taskRouter.get("/", getAllTasks)
taskRouter.post("/", createTask)
taskRouter.patch("/:id", updateTask)
taskRouter.delete("/:id", deleteTask)

export { taskRouter }

