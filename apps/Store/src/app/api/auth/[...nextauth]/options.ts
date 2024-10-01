// import connectdb from "@repo/db/db"
import connectdb from "@repo/db/db"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
 
export const authOptions: NextAuthOptions = {

    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login'
    },

    callbacks:{

      async jwt({ token, user }) {
        if(user) {
          token.id = user.id.toString(),
          token.firstname = user.firstname,
          token.lastname = user.lastname,
          token.email = user.email,
          token.phone = user.phone
        }
        return token
      },

      async session({ session, token }) {
        session.user.id = token.id,
        session.user.firstname = token.firstname
        session.user.lastname = token.lastname
        session.user.phone = token.phone
        return session
      }

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
        
        const user = users?.rows[0]
        await client?.release()
        if (compare_Password) {
          return user
        } else {
          return NextResponse.json({ reason: "invalid credentials"})
        }
      },
    }),
  ],
}