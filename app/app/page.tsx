'use client'
import { useDatabase } from "@/contexts/databaseContext"
import { useSession } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { SignedInSessionResource } from "@clerk/types"
import Onboarding from "@/components/onboarding/Onboarding"
import SelectInterests from "@/components/onboarding/SelectInterests"

export default function AppPage() {
    const { session } = useSession()
    const { supabase, setSupabaseClient, getUserData } = useDatabase()
    const [showOnBoarding, setShowOnboarding] = useState<boolean>(false)
    const [showSelectInterests, setShowSelectInterests] = useState<boolean>(false)

    useEffect(() => {
        async function initializeSupabase(session: SignedInSessionResource) {
            const token = (await session?.getToken()) as string
            if(token) {
                setSupabaseClient(token)
            }
        }
        if( session && !supabase) {
            initializeSupabase(session)
        }else {
            console.log("No clerk session")
        }
    }, [session, setSupabaseClient, supabase])

    useEffect(() => {
        console.log('Supabse', supabase)
        console.log('Session', session?.user.id)
        if(supabase && session?.user.id) {
            getUserData(session?.user.id).then((user) => {
                if(user) {
                    console.log(user)
                    if(user.interests.length === 0) {
                        setShowOnboarding(false)
                        setShowSelectInterests(true)
                    } else {
                        setShowOnboarding(false)
                        setShowSelectInterests(false)
                    }
                } else {
                    setShowOnboarding(true)
                }
            })
        }
    }, [supabase, session?.user.id, getUserData])

    if(showOnBoarding){
        return <Onboarding />
    }

    if(showSelectInterests) {
        return <SelectInterests />
    }

    return (
        <section className="flex items-center justify-center">
            <h1>App is runnig</h1>
        </section>
    )
}
