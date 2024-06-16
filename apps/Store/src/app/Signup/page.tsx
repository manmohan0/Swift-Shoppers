"use client"

import { Button } from "@repo/ui/Button"
import { InputBox } from "@repo/ui/inputBox"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"

export default function Home () {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [generatedOTP, setGeneratedOTP] = useState(false)
    const [OTP, setOTP] = useState("")
    const [type] = useState("Signup")

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    const handleOTPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value)
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div className="w-64 m-auto flex align-middle justify-center">
            <div className="p-4 mt-64 shadow-md">
                <InputBox placeHolder={"Manmohan Wable"} type={"text"} onInput={handleNameInput} label={"Name"}/>
                <InputBox placeHolder={"Manmohan"} type={"email"} onInput={handleEmailInput} label={"Email"}/>
                <InputBox placeHolder={"1234567890"} type={"tel"} onInput={handlePhoneInput}  max={10} label={"Phone"}/>
                <Button type={"submit"} onClick={ async () => {
                    try {
                        await axios.post("/generate_OTP", {
                            email,
                            phone,
                            type
                        })
                        setGeneratedOTP(true)
                    } catch (error) {
                        console.log(error)
                    }
                    }
                } value="Sign In"/>
                <span className="font-extralight">Already have an account? <Link href={"/Signin"}> Sign In </Link></span>
            </div>
        </div>
    )
}