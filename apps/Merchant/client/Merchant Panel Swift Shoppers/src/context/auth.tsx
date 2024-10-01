import { log_user } from "@/types"
import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import { redirect } from "react-router-dom";


type AuthContextType = [log_user, React.Dispatch<React.SetStateAction<log_user>>] | null;

export const AuthContext = createContext<AuthContextType>([{
    name: "",
    email: "",
    phone: ""
}, () => { }])

export const AuthProvider = ({children}: {children : React.ReactNode}) => {
    const [auth, setAuth] = useState<log_user>({
        name: "",
        email: "",
        phone: ""
    })

    useEffect(() => {
        const getUser = async () => {
            try {
                axios.get("http://localhost:3000/", {
                    withCredentials: true
                }).then(result => {
                    const user = result.data.user
                    setAuth({
                        ...auth,
                        name: user.name,
                        email: user.email,
                        phone: user.phone_no
                    })
                })
            } catch (error) {
                redirect("/signup")
            }
        }
        getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const authContext = useContext(AuthContext)?.[0]
    // console.log(authContext)
    if (!AuthContext) {
        redirect('/signin')
    }
    return authContext
}