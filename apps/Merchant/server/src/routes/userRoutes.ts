import { Router } from "express"

export const userRouter = Router()

userRouter.get('/dashboard', (req, res) => {
    res.json({
        message: 'Sign up page',
    })
})