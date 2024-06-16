import { NextRequest, NextResponse } from "next/server";
import { totp } from "otplib";
import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

const generate_OTP = (secret: string) => totp.generate(secret)
export const Verify_OTP = (token: string, secret: string) => totp.check(token, secret)

export async function POST(req: NextRequest, res: NextResponse){
    
    const userDetails = await req.json()

    // const otp = totp.generate(process.env.TOTP_SECRET ?? '')
    const otp = generate_OTP(process.env.TOTP_SECRET ?? '')


    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    const info = transport.sendMail({
        from: `"Manmohan" ${process.env.USER}`,
        to: userDetails.email,
        subject: "Verify your email",
        html: `<b> Login OTP is ${otp} </b>`
    })

    return NextResponse.json({message: "Working"})
}