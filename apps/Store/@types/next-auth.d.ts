import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
            phone: string
    }
    interface Session {
        user: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
            phone: string
        } & DefaultSession["user"]
    } 
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        firstname: string;
        lastname: string;
        email: string;
        phone: string
    }
}