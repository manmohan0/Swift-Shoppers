import { NextRequest, NextResponse } from "next/server";
import { totp } from "otplib";
import dotenv from "dotenv"
import { redirect } from "next/navigation";
dotenv.config()

export async function POST(req: NextRequest, res: NextResponse) {
    const { OTP } = await req.json()
    console.log("Working")
    // const OTP_check = Verify_OTP(OTP, process.env.TOTP_SECRET ?? '')
    const OTP_check = totp.check(OTP, process.env.TOTP_SECRET ?? '')
    console.log(OTP_check)
    console.log(typeof(OTP))

    if (OTP_check){
        return redirect(`${req.nextUrl.host}/`)
    }
    return NextResponse.json({msg:"Error"})
}