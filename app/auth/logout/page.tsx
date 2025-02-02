
'use client'

import { signOut } from "next-auth/react"
import { useLayoutEffect } from "react"


export default function Unauthorized() {
    useLayoutEffect(() => {
        signOut({ callbackUrl: '/' })
    }, [])
    return (
        null
    )
}