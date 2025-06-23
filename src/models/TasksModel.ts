// estructurar la data
// definit un modelo
import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
},
  { versionKey: false, timestamps: true }
)

const Task = model("Task", taskSchema)

export { Task }