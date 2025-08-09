import Link from "next/link"
import { Button } from "../button/button"
import { Mail, User } from "../Icons"
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs"



const trailingItems = () => {
  return (
    <div className="flex items-center gap-3">
        <button className="tesxt-black rounded-full hover:bg-slate-200 p-2 cursor-pointer">
            <Mail />
        </button>
        <SignedOut>
            <SignInButton>
                <Button variant={'secondary'}>Log in</Button>
            </SignInButton>
            <SignUpButton>
                <Button variant={'primary'}>Sign up</Button>
            </SignUpButton>
        </SignedOut>
        <SignedIn>
            <SignOutButton>
                <Button variant={'secondary'}>Log out</Button>
            </SignOutButton>
        </SignedIn>
        <Link href={'/app/dashboard'}>
            <Button variant={'icon'}>
                <User />
            </Button>
        </Link>
    </div>
  )
}
export default trailingItems