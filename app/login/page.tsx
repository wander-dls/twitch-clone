'use client'
import logo from "@/app/twitch-purple.svg"
import Image from "next/image"
import { SignUpButton, SignedOut, SignInButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/button/button"
import { redirect } from "next/navigation"



export default function LoginPage() {
    const { isSignedIn } = useUser()
    if (isSignedIn) {
        redirect('/app')
    }

    return (
        <section className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col items-center space-y-6">
                <Image src={logo} alt="twitch logo" width={200} height={200} />
                <h1 className="text-2xl font-bold">Before acessing our app...</h1>
                <div className="flex items-center gap-8">
                    <SignedOut>
                        <SignInButton>
                            <Button variant={'secondary'}>Log In</Button>
                        </SignInButton>
                        <SignUpButton>
                            <Button variant={'primary'}>Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </div>
        </section>
    )
}