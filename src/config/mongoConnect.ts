import mongoose from "mongoose";

const URI_DB = process.env.URI_DB!

const connect = async () => {
  try {
    await mongoose.connect(URI_DB)
    console.log("✅ Conectado con éxito a mongodb")
  } catch (error) {
    console.log("🛑 Error al conectarse a monogodb")
  }
}

export { connect }