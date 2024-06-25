import { useState, useEffect } from "react"
import { authType, userType } from "./interface.js"
import { useCookies } from "next-client-cookies"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export async function useAuth() {

    const cookie = useCookies()
    const [auth, setAuth] = useState<authType>({
        User: null,
        token: ""
    })

    useEffect(() => {
        if (!auth.User){
            const user_token = cookie.get("user")
            console.log(user_token, process.env.JWT_SECRET)
            const getUser = jwt.verify(user_token as string, process.env.JWT_SECRET as string)
            if (getUser) {
                setAuth({User: getUser as userType, token:user_token as string})
            }
        }
    }, [auth])

    return auth.User ? auth.User : null
}