import { NextFunction, Request, Response } from "express"
import JWT from "jsonwebtoken"

export const auth = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const token = await req.cookies.account
        const dec_user = JWT.verify(token, process.env.JWT_SECRET_KEY ?? "ABC")
    
        req.user = dec_user
    
        next()
    } catch (error) {
        // console.log(res.setHeader())
        res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.redirect(`${process.env.FE_URL}signup`)
    }
}