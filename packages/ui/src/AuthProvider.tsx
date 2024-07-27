"use client"
import { SessionProvider } from "next-auth/react"
import React = require("react")
export function AuthProvider({ children }: { children: React.ReactNode}) {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    )
  }