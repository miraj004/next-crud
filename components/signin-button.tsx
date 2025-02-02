"use client"
import { signIn } from "next-auth/react"
 
export function SignIn() {
  return (
    <button onClick={() => signIn("keycloak", { redirectTo: "/dashboard" })}>
      Sign In
    </button>
  )
}