'use client'
import { useDatabase } from "@/contexts/databaseContext"
import { useSession } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { SignedInSessionResource } from "@clerk/types"
import Onboarding from "@/components/onboarding/Onboarding"
import SelectInterests from "@/components/onboarding/SelectInterests"
import { Tables } from "@/database/database.types"
import LiveChannels from "@/components/livechannels/LiveChannels"
import HomeFeed from "@/components/homeFeed/HomeFeed"


export default function AppPage() {
    const { session } = useSession()
    const { 
        supabase, 
        setSupabaseClient, 
        getUserData, 
        getLivestreams, 
        setLivestreamsMockData, 
        removingLivestreamsMockData 
    } = useDatabase()

    const [showOnBoarding, setShowOnboarding] = useState<boolean>(false)
    const [showSelectInterests, setShowSelectInterests] = useState<boolean>(false)
    const [livestreams, setLivestreams] = useState<Tables<'livestreams'>[]>([])

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
                        getLivestreams().then((livestreams) => {
                            return setLivestreams(livestreams || [])
                        })
                    }
                } else {
                    setShowOnboarding(true)
                }
            })
        }
    }, [supabase, session?.user.id, getUserData, getLivestreams])

    if(showOnBoarding){
        return <Onboarding />
    }

    if(showSelectInterests) {
        return <SelectInterests />
    }

    return (
        <>
            <section className="grid h-full grid-cols-[auto_1fr]">
                <LiveChannels livestreams={livestreams} />
                <HomeFeed livestreams={livestreams} />
            </section>
            <button onClick={() => setLivestreamsMockData()}>Set Mock Data</button>
            <button onClick={() => removingLivestreamsMockData()}>Remove Mock Data</button>
        </>
    )
}
