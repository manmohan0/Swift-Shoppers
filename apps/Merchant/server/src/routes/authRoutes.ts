import { Router } from "express"

export const authRouter = Router()

authRouter.get('/signup', (req, res) => {
    res.json({
        message: 'Sign up page',
    })
})

authRouter.get('/signin', (req, res) => {
    res.json({
        message: 'Sign in page',
    })
})