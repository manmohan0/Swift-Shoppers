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

        const user = await client?.query(query, values)

        const compare_Password = await bcrypt.compare(credentials?.password as string, user?.rows[0].password)

        if (compare_Password) {
          return user?.rows[0]
        } else {
          return NextResponse.json({ reason: "invalid credentials"})
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }