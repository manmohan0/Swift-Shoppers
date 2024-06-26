// import connectdb from "@repo/db/db"
import connectdb from "@repo/db/db"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
 
export const handler = NextAuth({

    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: '/login'
    },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials, req) {
        
        const client = await connectdb()

        const query = "SELECT * FROM users WHERE email = $1"
        const values = [credentials?.email]
        
        const users = await client?.query(query, values)
        const compare_Password = await bcrypt.compare(credentials?.password as string, users?.rows[0].passwords)
        
        const current_user = users?.rows[0]

        // const user = {
        //   id: current_user.id,
        //   firstname: current_user.firstname,
        //   lastname: current_user.lastname,
        //   phone: current_user.phone,
        //   email: current_user.email,
        //   password: current_user.passwords
        // }

        if (compare_Password) {
          return current_user
        } else {
          return NextResponse.json({ reason: "invalid credentials"})
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }