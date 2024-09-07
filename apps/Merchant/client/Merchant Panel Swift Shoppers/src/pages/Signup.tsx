"use client"

import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import { Button } from "@repo/ui/Button"
import { InputBox } from "@repo/ui/inputBox"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { accountInfo, business, user } from "@/types"
import { createUserState } from "@/enums"

export default function Home () {
    
    const [user, setUser] = useState<user>({
        name: "",
        email: "",
        phone: null,
        password: "",
        confirmPassword: ""
    })

    const [businessInfo, setBusinessInfo] = useState<business>({
        businessName: "",
        businessEmail: "",
        businessPhone: null,
    })

    const [accountInfo, setAccountInfo] = useState<accountInfo>({
        account_no: null,
        IFSC_code: ""
    })

    const [cState, setCstate] = useState(createUserState.user_info)

    const navigate = useNavigate()

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, email: e.target.value})
    }

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, phone: parseInt(e.target.value)})
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, name: e.target.value})
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: e.target.value})    
    }

    const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, confirmPassword: e.target.value})
    }

    const handleBusinessNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessInfo({...businessInfo, businessName: e.target.value})
    }

    const handleBusinessEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessInfo({...businessInfo, businessEmail: e.target.value})
    }

    const handleBusinessPhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessInfo({...businessInfo, businessPhone: parseInt(e.target.value)})
    }

    const handleAccountNoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo({...accountInfo, account_no: parseInt(e.target.value)})
    }
    
    const handleIFSCInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo({...accountInfo, IFSC_code: e.target.value})
    }

    const handleNext = () => {
        if (cState == createUserState.user_info){
            setCstate(createUserState.business_info)
        }
        if (cState == createUserState.business_info){
            setCstate(createUserState.account_info)
        }
        if (cState == createUserState.account_info){
            handleSubmit()
        }
        console.log(cState)
    }

    const handleSubmit = async () => {
        try {
            const result = await axios.post(`${import.meta.env.BACKEND_URL}/auth/Signup`, {
                    user
                })
            
            if (result && result.data.success && result.data.reason == "") {    
                toast.success("Account created successfully")
                navigate('/')
            }
            if (result && !result.data.success && result.data.reason == "email is linked to another account") toast.error("Email is linked to another account")
            if (result && !result.data.success && result.data.reason == "phone is linked to another account") toast.error("Phone Number is linked to another account")
            if (result && !result.data.success && result.data.reason == "invalid input") toast.error("Invalid Input")
            if (result && !result.data.success && result.data.reason == "internal server error") toast.error("Internal Server Error")
                
        } catch (error) {
            console.log(error)
        }
    }

    if (cState == createUserState.user_info) {
        return (
            <div className="w-64 m-auto mt-28 flex align-middle justify-center">
                <div className="p-4 my-auto shadow-md">
                    <InputBox placeHolder={"Manmohan Wable"} type={"text"} onInput={handleNameInput} label={"Full Name"}/>
                    <InputBox placeHolder={"abc@xyz.com"} type={"email"} onInput={handleEmailInput} label={"Email"}/>
                    <InputBox placeHolder={"1234567890"} type={"tel"} onInput={handlePhoneInput}  max={10} label={"Phone Number"}/>
                    <InputBox placeHolder={"Password"} type={"password"} onInput={handlePasswordInput} label={"Password"}/>
                    <InputBox placeHolder={"Confirm Password"} type={"password"} onInput={handleConfirmPasswordInput} label={"Confirm Password"}/>
                    <Button type={"submit"} onClick={ handleNext } value="Sign Up"/>
    
                    <span className="font-extralight">Already have an account? <Link to={"/Signin"}> Sign In </Link></span>
                    <Toaster/>
                </div>
            </div>
        )
    } else if (cState == createUserState.business_info) {
        return (
            <div className="w-64 m-auto mt-28 flex align-middle justify-center">
                <div className="p-4 my-auto shadow-md">
                    <InputBox placeHolder={"Business Name"} type={"text"} onInput={handleBusinessNameInput} label={"Business Name"}/>
                    <InputBox placeHolder={"abc@business.com"} type={"email"} onInput={handleBusinessEmailInput} label={"Email"}/>
                    <InputBox placeHolder={"1234567890"} type={"tel"} onInput={handleBusinessPhoneInput}  max={10} label={"Business Phone Number"}/>
                    <Button type={"submit"} onClick={ handleNext } value="Sign Up"/>
                    <Toaster/>
                </div>
            </div>
        )
    } else if (cState == createUserState.account_info) {
        return (
            <div className="w-64 m-auto mt-28 flex align-middle justify-center">
                <div className="p-4 my-auto shadow-md">
                    <InputBox placeHolder={"Manmohan Wable"} type={"text"} onInput={handleAccountNoInput} label={"Account Number"}/>
                    <InputBox placeHolder={"xyz000000"} type={"text"} onInput={handleIFSCInput} label={"IFSC code"}/>
                    <Button type={"submit"} onClick={ handleSubmit } value="Sign Up"/>
                    <Toaster/>
                </div>
            </div>
        )
    }
}