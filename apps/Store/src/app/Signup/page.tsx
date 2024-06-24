"use client"

import { useState } from "react"
import { Button } from "@repo/ui/Button"
import { InputBox } from "@repo/ui/inputBox"
import axios from "axios"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function Home () {
    
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const router = useRouter()

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    const handleFNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFName(e.target.value)
    }

    const handleLNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLName(e.target.value)
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            const result = await axios.post("/api/create_Account", {
                    fName,
                    lName,
                    email,
                    phone,
                    password,
                    confirmPassword
                })

            if (result && result.data.success && result.data.reason == "") {    
                toast.success("Account created successfully")
                router.push("/")
            }
            if (result && !result.data.success && result.data.reason == "email is linked to another account") toast.error("Email is linked to another account")
            if (result && !result.data.success && result.data.reason == "phone is linked to another account") toast.error("Phone Number is linked to another account")
            if (result && !result.data.success && result.data.reason == "invalid input") toast.error("Invalid Input")
            if (result && !result.data.success && result.data.reason == "internal server error") toast.error("Internal Server Error")
                
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="w-64 m-auto mt-28 flex align-middle justify-center">
            <div className="p-4 my-auto shadow-md">

                <InputBox placeHolder={"Manmohan"} type={"text"} onInput={handleFNameInput} label={"First Name"}/>
                <InputBox placeHolder={"Wable"} type={"text"} onInput={handleLNameInput} label={"Last Name"}/>
                <InputBox placeHolder={"abc@xyz.com"} type={"email"} onInput={handleEmailInput} label={"Email"}/>
                <InputBox placeHolder={"1234567890"} type={"tel"} onInput={handlePhoneInput}  max={10} label={"Phone"}/>
                <InputBox placeHolder={"Password"} type={"password"} onInput={handlePasswordInput} label={"Password"}/>
                <InputBox placeHolder={"Confirm Password"} type={"password"} onInput={handleConfirmPasswordInput} label={"Confirm Password"}/>
                <Button type={"submit"} onClick={ handleSubmit } value="Sign Up"/>

                <span className="font-extralight">Already have an account? <Link href={"/Signin"}> Sign In </Link></span>
                <Toaster/>
            </div>
        </div>
    )
}