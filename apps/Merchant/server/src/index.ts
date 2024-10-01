import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookie_parser from "cookie-parser"
import { authRouter } from './routes/authRoutes.js'
import { userRouter } from './routes/userRoutes.js'
import { auth } from "./middlewares/Auth.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 80

app.use(express.json())
app.use(cookie_parser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.options('*', cors()); 

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.get(`/`, auth, (req, res) => {
    res.json({
        user: req.user
    })
})

app.listen(PORT, () => {
    console.log(`Merchant server started at http://localhost:${PORT}`)
})