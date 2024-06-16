import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv"
import { Verify_OTP } from "../generate_OTP/route";

dotenv.config()

export async function POST(req: NextRequest, res: NextResponse) {
    const { OTP } = await req.json()

    const OTP_check = Verify_OTP(OTP, process.env.TOTP_SECRET ?? '')

    console.log(OTP_check)
    if (OTP_check){
        return NextResponse.redirect('/')
    }
    return NextResponse.json({msg:"Error"})
}