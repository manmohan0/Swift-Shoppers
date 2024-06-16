"use client"

import { InputBox } from "@repo/ui/inputBox"
import { Button } from "@repo/ui/Button"
import React, { useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function Home () {
    
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [generatedOTP, setGeneratedOTP] = useState(false)
    const [OTP, setOTP] = useState("")
    const [type] = useState("Signin")

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    const handleOTPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value)
    }

    if (!generatedOTP){
        return(
        <div className="w-64 m-auto flex align-middle justify-center">
            <div className="p-4 mt-64 shadow-md">
                <InputBox placeHolder={"Manmohan Wable"} type={"email"} onInput={handleEmailInput} label={"Email"}/>
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
                <span className="font-extralight">don't have an account? <Link href={"/Signup"}> Sign Up </Link> </span>
            </div>
        </div>
        )
    } else {
        return (
            <div className="w-64 m-auto flex align-middle justify-center">
                <div className="p-4 mt-64 shadow-md">
                    <InputBox type={"number"} placeHolder={"OTP"} onInput={handleOTPInput} label={"OTP"} />
                    <Button type={"submit"} onClick={ async () => {
                        await axios.post("/check_OTP", {
                            OTP
                        })
                    }} value={"Submit"} />
                </div>
            </div>
        )
    }
}