import express from "express"
import dotenv from "dotenv"
import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 80

app.use(express.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Merchant server started at http://localhost:${PORT}`)
})