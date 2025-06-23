import { z } from "zod"

const taskSchema = z.object({
  text: z.string().min(1, "La tarea tiene que tener como mínimo 1 caracter")
})

export { taskSchema }