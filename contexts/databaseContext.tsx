
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { createContext, useCallback, useContext, useState } from "react"
import type { Tables } from "@/database/database.types"
import { liveStreams } from "@/database/mockData"


type DatabaseContextType = {
    supabase: SupabaseClient | null
    error: string | null
    setSupabaseClient: (accessToken: string) => void
    getUserData: (
        userId: string,
        field?: string
    ) => Promise<Tables<'users'> | null>
    setUserData: (
        username: string,
        imageUrl: string,
        mail: string,
        dateOfBirth: string,
        userId: string
    ) => Promise<Tables<'users'> | null>
    setUserInterests: (
        interests: string[],
        userId: string
    ) => Promise<Tables<'users'> | null>
    getLivestreams:() => Promise<Tables<'livestreams'>[] | null>
    createLivestream: (
        name: string,
        categories: string[],
        username: string,
        imageUrl: string,
    ) => Promise<Tables<'livestreams'> | null>
    deleteLivestream: (username: string) => Promise<boolean>
    setLivestreamsMockData: () => void
    removingLivestreamsMockData: () => void
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null)

export const DatabaseProvider = ({
    children,
} : {

    children: React.ReactNode
}) => {
    const [supabase, setSupabase] = useState<SupabaseClient | null>(null)
    const [error, setError] = useState<string | null>(null)


    // Function to initialize Supabase client with the provided access token
    const setSupabaseClient = useCallback((accessToken: string): void => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error("Supabase URL or Key is not defined in environment variables.")
        }
        const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
            accessToken: async () => accessToken,
        })
        setSupabase(supabaseClient)
    }, [])

    // Function to get user data by user ID
    const getUserData = useCallback(
        async (
            userId: string,
            field: string = "user_id"
        ): Promise<Tables<'users'> | null> => {
            console.log(
                'Getting user data from supabase: ',
                supabase,
                'for userId: ',
                userId,
            )
            if(!supabase) {
                return null
            }
            try {
                const { data, error } = await supabase
                .from('users')
                .select('*')
                // Filter case insensitive
                .ilike(field, `%${userId}%`)
                .single()

                console.log('User data retrieved: ', data)

                if (error) {
                    console.log('Error fetching user data: ', error)
                    setError(`Error getting user data: ${error.message}`)
                    return null
                }
                return data
            } catch (error) {
                console.error('Unexpected error fetching user data: ', error)
                return null
            }
        },
        [supabase]
    )
  
    // Function to set or update user data
    const setUserData = useCallback(
        async (
            username: string,
            imageUrl: string,
            mail: string,
            dateOfBirth: string,
            userId: string
        ): Promise<Tables<'users'> | null> => {
            if(!supabase) {
                return null
            }
            try {
                const { data, error } = await supabase
                .from('users')
                .insert({
                    username,
                    image_url: imageUrl,
                    mail,
                    date_of_birth: dateOfBirth,
                    user_id: userId,
                    followers: [],
                    following: [],
                    interests: []
                })
                .select()
                .single()

                if (error) {
                    console.log('Error upserting user data: ', error)
                    setError(`Error setting user data: ${error.message}`)
                    return null
                }
                return data as Tables<'users'>
            } catch (error) {
                console.error('Unexpected error upserting user data: ', error)
                return null
            }
        },
        [supabase]
    )

    // Function to set or update user interests
    const setUserInterests = useCallback(
        async (
            interests: string[],
            userId: string
        ): Promise<Tables<'users'> | null> => {
            if(!supabase) {
                return null
            }
            try {
                const { data, error } = await supabase
                .from('users')
                .update({ interests: interests })
                .eq('user_id', userId)
                .select()
                .single()

                if (error) {
                    console.log('Error updating user interests: ', error)
                    setError(`Error setting user interests: ${error.message}`)
                    return null
                }
                return data as Tables<'users'>
            } catch (error) {
                console.error('Unexpected error updating user interests: ', error)
                return null
            }
        },
        [supabase])

    // Function to get all livestreams
      const getLivestreams = useCallback(async (): Promise<Tables<'livestreams'>[]> => {
        if(!supabase) {
            return []
        }
        try {
            const { data, error } = await supabase.from('livestreams').select('*')
            if (error) {
                console.log('Error getting livestreams', error)
                setError(`Error getting livestreams: ${error.message}`)
                return []
        }
            return data as Tables<'livestreams'>[]
        } catch (error) {
            console.error('Unexpected error getting livestreams: ', error)
            return []
        }
    }, [supabase])

    // Function to create a new livestream
    const createLivestream = useCallback(
    async (
        name: string,
        categories: string[],
        username: string,
        imageUrl: string,
    ): Promise<Tables<'livestreams'> | null> => {
        if(!supabase) {
            console.error('[createLivestreams]Supabase client is not initialized')
            return null
        }
        try {
            const { data, error } = await supabase
            .from('livestreams')
            .insert({
                name,
                categories,
                username,
                image_url: imageUrl,
            })
            .select()
            .single()
            if (error) {
                console.log('Error creating livestream: ', error)
                setError(`Error creating livestream: ${error.message}`)
                return null
            }
            return data as Tables<'livestreams'>
        } catch (error) {
            console.error('Unexpected error creating livestream: ', error)
            return null
        }
    }, [supabase])

    // Function to delete a livestream by username
    const deleteLivestream = useCallback(
    async (username: string): Promise<boolean> => {
        if(!supabase) {
            console.error('[deleteLivestream]Supabase client is not initialized')
            return false
        }
        try {
            const { error } = await supabase
            .from('livestreams')
            .delete()
            .eq('username', username)
            if (error) {
                console.log('Error deleting livestream: ', error)
                setError(`Error deleting livestream: ${error.message}`)
                return false
            }
            return true
        } catch (error) {
            console.error('Unexpected error deleting livestream: ', error)
            return false
        }
    }, [supabase])

    // Function to set mock data for livestreams
    const setLivestreamsMockData = useCallback( async () => {
        if(!supabase) {
            return    
        }
    
        const { data, error} = await supabase
            .from('livestreams')
            .insert(liveStreams)
            if (error) {
                console.log('Error setting livestreams mock data: ', error)
                setError(`Error setting livestreams mock data: ${error.message}`)
                return
            }
        return data
    }, [supabase])

    // Function to remove mock data for livestreams
    const removingLivestreamsMockData = useCallback(async () => {
        if(!supabase) {
            return
        }
        const { error } = await supabase
            .from('livestreams')
            .delete()
            .in('id', liveStreams.map(livestream => livestream.id))
        if (error) {
            console.log('Error removing livestreams mock data: ', error)
            setError(`Error removing livestreams mock data: ${error.message}`)
            return
        }
    }, [supabase])

    return (
        <DatabaseContext.Provider 
            value={{ 
                supabase, 
                error, 
                setSupabaseClient, 
                getUserData, 
                setUserData, 
                setUserInterests,
                getLivestreams,
                createLivestream,
                deleteLivestream,
                setLivestreamsMockData,
                removingLivestreamsMockData
            }}>
            {children}
        </DatabaseContext.Provider>
    )
} 


export const useDatabase = () => {
    const context = useContext(DatabaseContext)
    if (!context) {
        throw new Error("useDatabase must be used within a DatabaseProvider")
    }
    return context
}