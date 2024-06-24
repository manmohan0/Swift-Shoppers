"use client"

import { InputBox } from "@repo/ui/inputBox"
import { Button } from "@repo/ui/Button"
import React, { useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function Home () {
    
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    return(
        <div className="w-64 m-auto mt-48 flex align-middle justify-center">
            <div className="p-4 shadow-md">
                <InputBox placeHolder={"Manmohan Wable"} type={"email"} onInput={handleEmailInput} label={"Email"}/>
                <InputBox placeHolder={"1234567890"} type={"tel"} onInput={handlePhoneInput}  max={10} label={"Phone"}/>
                <Button type={"submit"} onClick={ async () => {
                    try {
                        await axios.post("/Signin", {
                            email,
                            phone,
                        })
                    } catch (error) {
                        console.log(error)
                    }
                    }
                } value="Sign In"/>
                <span className="font-extralight">don't have an account? <Link href={"/Signup"}> Sign Up </Link> </span>
            </div>
        </div>
    )
}