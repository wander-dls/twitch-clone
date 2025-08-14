'use client'
import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { createStreamUser } from "@/app/actions"

export type UserObject = {
    userId: string
    email: string
    imageUrl?: string
    fullName?: string
}

const Page = () => {
    const [creationOngoing, setCreationOngoing] = useState<boolean>(true)
    const { user } = useUser()

    useEffect(() => {
       const createStreamUserOnServer = async () => {
        if(!user?.id) {
            console.error('[createStreamUser] No user ID found from Clerk')
            return
        }

        if(!user?.primaryEmailAddress?.emailAddress) {
            console.error('[createStreamUser] No email address found from Clerk user')
            return
        }
        const userObject: UserObject = {
            userId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            imageUrl: user.imageUrl,
            fullName: user.fullName ?? undefined
        }
        await createStreamUser(userObject)
        setCreationOngoing(false)
       } 
         createStreamUserOnServer()
    },[user])

    if(creationOngoing) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h1>Creating a new user...</h1>
            </div>
        )
    }
    redirect("/app")
}
export default Page