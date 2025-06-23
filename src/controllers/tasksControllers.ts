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


// caso deseado -> {success: true, message: string, data}
// caso no deseado -> {success: false, message}

const getAllTasks = async (request: Request, response: Response) => {
  try {
    const tasks = await Task.find({})
    response.status(OK).json({ success: true, message: "Éxito al obtener las tareas", data: tasks })
  } catch (error: any) {
    response.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const createTask = async (request: Request, response: Response): Promise<any> => {
  const body = request.body
  try {
    const { text } = body

    const validator = taskSchema.safeParse({ text })

    if (!validator.success) {
      return response.status(BAD_REQUEST).json({ success: false, message: validator.error.issues })
    }

    //-----------------------------------------

    const newTask = new Task({ text })
    await newTask.save()

    response.status(CREATED).json({ success: true, message: "Tarea registrada con éxito", data: newTask })
  } catch (error: any) {
    response.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const updateTask = async (request: Request, response: Response): Promise<any> => {
  const id = request.params.id
  const body = request.body
  try {
    const { text } = body

    if (!text || !id) {
      return response.status(BAD_REQUEST).json({ success: false, message: "Data invalida" })
    }

    const updatedTask = await Task.findByIdAndUpdate(id, { text }, { new: true })

    if (!updatedTask) {
      return response.status(NOT_FOUND).json({ success: false, message: "Error al encontrar la tarea" })
    }

    response.json({ success: true, message: "Tarea actualizada con éxito", data: updatedTask })
  } catch (error) {
    const err = error as Error
    response.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message })
  }
}

const deleteTask = async (request: Request, response: Response): Promise<any> => {
  const { id } = request.params
  try {
    if (!id) {
      return response.status(BAD_REQUEST).json({ success: "false", message: "Data invalida" })
    }

    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return response.status(NOT_FOUND).json({ success: false, message: "Error al encontrar la tarea" })
    }

    response.json({ success: true, message: "Tarea borrada con éxito", data: deletedTask._id })
  } catch (error) {
    const err = error as Error
    response.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message })
  }
}

export { getAllTasks, createTask, updateTask, deleteTask }