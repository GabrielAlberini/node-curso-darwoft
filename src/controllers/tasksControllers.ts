// tomar y sanitizar data de entrada (input)
// procesos internos -> hash de la contraseña
import { NextFunction, Request, Response } from "express"
import { Task } from "../models/TasksModel"
import { HTTP_STATUS_CODES } from "../utils/statusCodes"
import { taskSchema } from "../validators/TaskSchemaValidator"

const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = HTTP_STATUS_CODES

declare module "express" {
  interface Request {
    userId?: string
  }
}

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const tasks = await Task.find({ userId })
    res.status(OK).json({ success: true, message: "Éxito al obtener las tareas", data: tasks })
  } catch (error: any) {
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const createTask = async (req: Request, res: Response): Promise<void> => {
  const body = req.body
  const userId = req.userId
  try {
    const { text } = body

    const validator = taskSchema.safeParse({ text })

    if (!validator.success) {
      res.status(BAD_REQUEST).json({ success: false, message: validator.error.issues })
      return
    }

    const newTask = new Task({ text, userId })
    await newTask.save()

    res.status(CREATED).json({ success: true, message: "Tarea registrada con éxito", data: newTask })
  } catch (error: any) {
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const updateTask = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  const body = req.body
  const userId = req.userId
  try {
    const { completed } = body

    if (!id || completed === undefined) {
      res.status(BAD_REQUEST).json({ success: false, message: "Data invalida" })
      return
    }

    const task = await Task.findOne({ _id: id, userId })

    if (!task) {
      res.status(NOT_FOUND).json({ success: false, message: "Tarea no encontrada" })
      return
    }

    task.completed = !task.completed
    await task.save()

    res.json({ success: true, message: "Tarea actualizada con éxito", data: task })
  } catch (error) {
    const err = error as Error
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message })
  }
}

const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const userId = req.userId

  try {
    if (!id) {
      res.status(BAD_REQUEST).json({ success: "false", message: "Data invalida" })
      return
    }

    const deletedTask = await Task.findByIdAndDelete({ _id: id, userId })
    if (!deletedTask) {
      res.status(NOT_FOUND).json({ success: false, message: "Error al encontrar la tarea" })
      return
    }

    res.json({ success: true, message: "Tarea borrada con éxito", data: deletedTask._id })
  } catch (error) {
    const err = error as Error
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message })
  }
}

export { getAllTasks, createTask, updateTask, deleteTask }