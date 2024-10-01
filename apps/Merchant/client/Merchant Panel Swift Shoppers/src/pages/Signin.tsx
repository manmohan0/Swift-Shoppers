"use client"

import { InputBox } from "../components/inputBox"
import { Button } from "../components/Button"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

export default function Signin () {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            // console.
            const result = await axios.post("/auth/signin", {
                email,
                password
            })
            
            if (result && result.data.success && result.data.reason == "") return navigate("/")
            if (result && !result.data.success && result.data.reason == "Invalid") return toast.error("Invalid Email or password")
            
        } catch (e) {
            console.log(e)
            toast.error("Internal Server Error")
        }
    }

    return (
        <div className="w-64 m-auto mt-48 flex align-middle justify-center">
            <div className="p-4 shadow-md">
                <InputBox placeHolder={"Manmohan Wable"} value={email} type={"email"} onInput={handleEmailInput} label={"Email"}/>
                <InputBox placeHolder={"Password"} value={password} type={"password"} onInput={handlePasswordInput} label={"Password"}/>
                <Button type={"submit"} onClick={handleSubmit} value="Sign In"/>
                <span className="font-extralight">don't have an account? <Link to={"/Signup"}> Sign Up </Link> </span>
                <Toaster/>
            </div>
        </div>
    )
}