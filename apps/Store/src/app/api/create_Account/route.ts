import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod"
import dotenv from "dotenv"
import connectdb from "@repo/db/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()

export async function POST(req: NextRequest, res: NextResponse){
    try {
        const { fName, lName, phone, email, password, confirmPassword } = await req.json()
        const parsed_phone = phone.toString()
        
        if (!fName) return NextResponse.json({success: false, reason: "fName"})
        if (!lName) return NextResponse.json({success: false, reason: "lName"})
        if (!phone) return NextResponse.json({success: false, reason: "phone"})
        if (!email) return NextResponse.json({success: false, reason: "email"})
        if (!password) return NextResponse.json({success: false, reason: "password"})
        
            
        if (password === confirmPassword){
            
            const user = {fName, lName, email, parsed_phone, password}

            const user_schema = z.object({
                fName: z.string(),
                lName: z.string(),
                email: z.string().email(),
                parsed_phone: z.string().length(10),
                password: z.string()
            })

            const parsed_user = user_schema.safeParse(user)

            if (parsed_user.success){
                const client = await connectdb()
            
                const check_email_query = "SELECT email FROM users WHERE email = $1"
                const check_email_result = await client?.query(check_email_query, [email])
                
                if (check_email_result) {
                    if (check_email_result.rows.length > 0) return NextResponse.json({success: false, reason: "email is linked to another account"})
                }
                
                const check_phone_query = "SELECT phone FROM users WHERE phone = $1"
                const check_phone_result = await client?.query(check_phone_query, [phone])
                
                if (check_phone_result) {
                    if (check_phone_result.rows.length > 0) return NextResponse.json({success: false, reason: "phone is linked to another account"})
                }

                const salt = await bcrypt.genSalt(12)
                const encrypted_password = await bcrypt.hash(password, salt)
                
                const query = "INSERT INTO users (firstname, lastname, phone, email, passwords) VALUES ($1, $2, $3, $4, $5)"
                await client?.query(query, [fName, lName, phone, email, encrypted_password])
                
                client?.release()
        
                return NextResponse.json({ success: true, reason: "" })
            } else {
                return NextResponse.json({ success: false, reason: "invalid input" })
            }
        } else {
            return NextResponse.json({ success: false, reason: "internal server error" })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, reason:"" })
    }
}