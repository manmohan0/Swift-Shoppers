import { json, query, Router } from "express"
// import connectdb from "@repo/db/db"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import cryptr from 'cryptr'
import dotenv from "dotenv"
import pkg from "pg"
import jsonwebtoken from "jsonwebtoken"
import { z } from "zod"
import connectdb from "../db/db.js"

dotenv.config()

export const authRouter = Router()
const Cryptr = new cryptr(process.env.M_SECRET_KEY ?? "XYZ", { encoding: "base64" })

// const nodeMailer = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// })

authRouter.post('/signup', async (req, res) => {

    try {
        // const client = await pool.connect()///////////////////// doesn't work if imported from packages
        const client = await connectdb()
        
        const nodeMailer = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        
        const merchant = req.body;

        const { name, email, phone, password } = merchant.user

        const user = { name, email, phone, password }
        
        const { businessName, businessEmail, businessPhone } = merchant.businessInfo

        const business = { businessName, businessEmail, businessPhone }

        const { account_no, IFSC_code } = merchant.accountInfo
        
        const accountInfo = { account_no, IFSC_code }

        const user_schema = z.object({
            name: z.string(),
            email: z.string().email(),
            phone: z.string().length(10),
            password: z.string()
        })
        
        const parsedMerchant = user_schema.safeParse(user)

        const business_schema = z.object({
            businessName: z.string(),
            businessPhone: z.string().length(10),
            businessEmail: z.string().email()
        })
        
        const parsedBusiness = business_schema.safeParse(business)

        const account_info_schema = z.object({
            account_no: z.string().length(11),
            IFSC_code: z.string().length(11)
        })
        
        const parsed_account_info = account_info_schema.safeParse(accountInfo)
        
        if (merchant.user.password === merchant.user.confirmPassword) {

            if (parsedMerchant.success){

                const check_email_query = "SELECT * FROM merchant_user WHERE email = $1"
                const check_email_result = await client?.query(check_email_query, [email])
                
                if (check_email_result?.rowCount != 0) return res.json({ success: false, reason: "email" })
                    
                const check_phone_query = "SELECT * FROM merchant_user WHERE email = $1"
                const check_phone_result = await client?.query(check_phone_query, [phone])
                
                if (check_phone_result?.rowCount != 0) return res.json({ success: false, reason: "phone" })

                if (parsedBusiness.success) {
                    
                    const check_businessEmail_query = "SELECT * FROM business WHERE business_email = $1"
                    const check_businessEmail_result = await client?.query(check_businessEmail_query, [businessEmail])
                    
                    if (check_businessEmail_result?.rowCount != 0) return res.json({ success: false, reason: "businessEmail" })
                        
                    const check_businessPhone_query = "SELECT * FROM business WHERE business_phone_no = $1"
                    const check_businessPhone_result = await client?.query(check_businessPhone_query, [businessPhone])
                    
                    if (check_businessPhone_result?.rowCount != 0) return res.json({ success: false, reason: "businessPhone" })                            
                    
                    if (parsed_account_info.success) {

                        const check_account_no_query = "SELECT * FROM account_info WHERE account_no = $1"
                        const check_account_no_result = await client?.query(check_account_no_query, [account_no])
                        
                        if (check_account_no_result?.rowCount != 0) return res.json({ success: false, reason: "account_no" })
                            
                        await client?.query("BEGIN")

                        const hash_password = await bcrypt.hash(password, 12)
                        
                        const create_merchant_query = "INSERT INTO merchant_user (name, email, phone_no, password) VALUES ($1, $2, $3, $4)"
                        await client?.query(create_merchant_query, [name, email, phone, hash_password])
                        
                        const create_business_query = "INSERT INTO business (business_name, business_email, business_phone_no, user_email) VALUES ($1, $2, $3, $4)"
                        await client?.query(create_business_query, [businessName, businessEmail, businessPhone, email])
                        
                        const enc_account_no = Cryptr.encrypt(account_no)
                        const enc_IFSC_code = Cryptr.encrypt(IFSC_code)
                        
                        const create_Account_query = "INSERT INTO account_info (account_no, ifsc_code, user_email) VALUES ($1, $2, $3)"
                        await client?.query(create_Account_query, [enc_account_no, enc_IFSC_code, email])
                        
                        await nodeMailer.sendMail({
                            from: process.env.EMAIL,
                            to: email,
                            subject: "Account Created Successfully",
                            html: `<h1>${phone}</h1>`,
                        })

                        await client?.query("COMMIT")

                        return res.status(200).json({ success: true, reason: "" })
                    } else {
                        return res.status(400).json({ success: false, reason: "parsed account info" })
                    }
                } else {
                    return res.status(400).json({ success: false, reason: "parsed business info" })
                }
            } else {
                return res.status(400).json({ success: false, reason: "parsed merchant info" })  
            }
        } else {
            return res.status(400).json({ success: false, reason: "password and confirm password must be same" })
        }
    
    } catch(e) {
        console.log(e)
        res.status(500).json({ success: false, reason: "Internal Server Error" })
    }
})

authRouter.post('/signin', async (req, res) => {
    
    const { email, password } = req.body

    // const client = await pool.connect()
    const client = await connectdb()

    const query = "SELECT * FROM merchant_user WHERE email = $1"
    const query_result = await client?.query(query, [email])

    const user = query_result?.rows[0]

    if (!user) return res.redirect("/signup")

    const dec_password = await bcrypt.compare(password, user.password)
    
    if (dec_password) {

        const jwt = jsonwebtoken
        
        const token =  jwt.sign(user, process.env.JWT_SECRET_KEY ?? "ABC")

        res.cookie("account", token, { httpOnly: false })
        
        res.json(({ success: true, reason: "", user: token }))
        // res.redirect('/')
    }
})