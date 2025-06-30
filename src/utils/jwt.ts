import jwt from "jsonwebtoken"
process.loadEnvFile()

const JWT_SECRET = process.env.JWT_SECRET!

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1m" })
}