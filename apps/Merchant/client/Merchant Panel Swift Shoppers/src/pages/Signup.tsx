"use client"

import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import { Button } from "@repo/ui/Button"
import { InputBox } from "@repo/ui/inputBox"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { accountInfo, business, user } from "@/types"
import { createUserState } from "@/enums"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Signup () {
    
    const [user, setUser] = useState<user>({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const [businessInfo, setBusinessInfo] = useState<business>({
        businessName: "",
        businessEmail: "",
        businessPhone: "",
    })

    const [accountInfo, setAccountInfo] = useState<accountInfo>({
        account_no: "",
        IFSC_code: ""
    })

    const [cState, setCstate] = useState<createUserState>(createUserState.user_info)

    const navigate = useNavigate()

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, email: e.target.value})
    }

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, phone: e.target.value})
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
        setBusinessInfo({...businessInfo, businessPhone: e.target.value})
    }

    const handleAccountNoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo({...accountInfo, account_no: e.target.value})
    }
    
    const handleIFSCInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo({...accountInfo, IFSC_code: e.target.value})
    }
    
    const handleNext = () => {
        
        if (cState == createUserState.user_info){
            if (!user.name) return toast.error(`Username should not be empty`)
            if (!user.email) return toast.error(`Email should not be empty`)
            if (!user.phone) return toast.error(`Phone should not be empty`)
            if (!user.password) return toast.error(`Password should not be empty`)
            if (!user.confirmPassword) return toast.error(`Confirm Password should not be empty`)
                
            setCstate(createUserState.business_info)
        } else if (cState == createUserState.business_info){
            if (!businessInfo.businessEmail) return toast.error(`Email field should not be empty`)
            if (!businessInfo.businessName) return toast.error(`Name should not be empty`)
            if (!businessInfo.businessPhone) return toast.error(`Phone Number should not be empty`)

            setCstate(createUserState.account_info)
        } else if (cState == createUserState.account_info){
            if (!accountInfo.account_no) return toast.error(`Account Number should not be empty`)
            if (!accountInfo.IFSC_code) return toast.error(`IFSC Code should not be empty`)

            handleSubmit()
        }
    }

    const handleBack = () => {
        if (cState == createUserState.business_info) {
            setCstate(createUserState.user_info)
        } else if (cState == createUserState.account_info) {
            setCstate(createUserState.business_info)
        }
    }

    const handleSubmit = async () => {
        try {
            console.log(`${import.meta.env.VITE_SERVER_URL}/auth/signup`)
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/signup`, {
                user,
                businessInfo,
                accountInfo
            })
            
            if (result && result.data.success && result.data.reason == "") {    
                toast.success("Account created successfully")
                navigate('/')
            }

            if (result && !result.data.success && result.data.reason == "Internal Server Error") toast.error("Internal Server Error")
            if (result && !result.data.success && result.data.reason == "password and confirm password must be same") toast.error("password and confirm password must be same")
            if (result && !result.data.success && result.data.reason == "parsed merchant info") toast.error("Your phone number must contain only 10 digits")
            if (result && !result.data.success && result.data.reason == "parsed business info") toast.error("Business phone number must contain only 10 digits")
            if (result && !result.data.success && result.data.reason == "parsed account info") toast.error("Account number and IFSC code must contain only 11 characters")
            if (result && !result.data.success && result.data.reason == "parsed business info") toast.error("Business phone number must contain only 10 digits")
            if (result && !result.data.success && result.data.reason == "account_no") toast.error("Account no used by another merchant")
            if (result && !result.data.success && result.data.reason == "businessPhone") toast.error("Business phone number used by another merchant")
            if (result && !result.data.success && result.data.reason == "businessEmail") toast.error("Business Email used by another account")
            if (result && !result.data.success && result.data.reason == "phone") toast.error("Phone number used by another merchant")
            if (result && !result.data.success && result.data.reason == "email") toast.error("Email used by another merchant")

        } catch (error) {
            console.log(error)
        }
    }

    if (cState == createUserState.user_info) {
        return (
            <div className="w-64 m-auto mt-28 flex align-middle justify-center">
                <div className="p-4 my-auto shadow-md">
                    <InputBox placeHolder={"Manmohan Wable"} value={user.name} type={"text"} onInput={handleNameInput} label={"Full Name"}/>
                    <InputBox placeHolder={"abc@xyz.com"} value={user.email} type={"email"} onInput={handleEmailInput} label={"Email"}/>
                    <InputBox placeHolder={"1234567890"} value={user.phone} type={"tel"} onInput={handlePhoneInput}  max={10} label={"Phone Number"}/>
                    <InputBox placeHolder={"Password"} value={user.password} type={"password"} onInput={handlePasswordInput} label={"Password"}/>
                    <InputBox placeHolder={"Confirm Password"} value={user.confirmPassword} type={"password"} onInput={handleConfirmPasswordInput} label={"Confirm Password"}/>
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
                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} className=" cursor-pointer bg-yellow-400 p-2 rounded-full"/>    
                    <InputBox placeHolder={"Business Name"} value={businessInfo.businessName} type={"text"} onInput={handleBusinessNameInput} label={"Business Name"}/>
                    <InputBox placeHolder={"abc@business.com"} value={businessInfo.businessEmail} type={"email"} onInput={handleBusinessEmailInput} label={"Email"}/>
                    <InputBox placeHolder={"1234567890"} type={"tel"} value={businessInfo.businessPhone} onInput={handleBusinessPhoneInput}  max={10} label={"Business Phone Number"}/>
                    <Button type={"submit"} onClick={ handleNext } value="Sign Up"/>
                    <Toaster/>
                </div>
            </div>
        )
    } else if (cState == createUserState.account_info) {
        return (
            <div className="w-64 m-auto mt-28 flex align-middle justify-center">
                <div className="p-4 my-auto shadow-md">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} className=" cursor-pointer bg-yellow-400 p-2 rounded-full"/>    
                    <InputBox placeHolder={"Manmohan Wable"} value={accountInfo.account_no} type={"text"} onInput={handleAccountNoInput} label={"Account Number"}/>
                    <InputBox placeHolder={"xyz000000"} value={accountInfo.IFSC_code} type={"text"} onInput={handleIFSCInput} label={"IFSC code"}/>
                    <Button type={"submit"} onClick={ handleSubmit } value="Sign Up"/>
                    <Toaster/>
                </div>
            </div>
        )
    }
}