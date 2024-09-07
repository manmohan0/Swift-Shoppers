"use client"

import { InputBox } from "@repo/ui/inputBox"
import { Button } from "@repo/ui/Button"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

export default function Home () {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return(
        <div className="w-64 m-auto mt-48 flex align-middle justify-center">
            <div className="p-4 shadow-md">
                <InputBox placeHolder={"Manmohan Wable"} type={"email"} onInput={handleEmailInput} label={"Email"}/>
                <InputBox placeHolder={"Password"} type={"password"} onInput={handlePasswordInput} label={"Password"}/>
                <Button type={"submit"} onClick={ async () => {
                    try {
                        const result = await signIn('credentials', {
                            email: email,
                            password: password,
                            redirect: false
                        })

                        if (result?.ok){
                            toast.success("Logged In Successfully")
                            router.push('/')
                        } else {
                            toast.error("Invalid Credentials")
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    }
                } value="Sign In"/>
                <span className="font-extralight">don't have an account? <Link href={"/Signup"}> Sign Up </Link> </span>
                <Toaster/>
            </div>
        </div>
    )
}