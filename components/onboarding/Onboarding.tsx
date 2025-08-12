'use client'
import { useDatabase } from "@/contexts/databaseContext"
import { useUser } from "@clerk/nextjs"
import { useEffect, useCallback, useState } from "react"


const Onboarding = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(true)
    const [form, setForm] = useState<{
        username: string
        imageUrl: string
        mail: string
        dateOfBirth: string
    }>({
        username: "",
        imageUrl: "",
        mail: "",
        dateOfBirth: ""
    })
    const { user } = useUser()
    const { setUserData, error } = useDatabase()

    useEffect(() => {
        const email = user?.emailAddresses[0]?.emailAddress
        if(email && form.mail === "") {
            setForm({
                ...form,
                mail: email
            })
        }
    },[user, form])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const submitUserData = useCallback(async () => {
        const userId = user?.id
        if(!userId) {
            console.error("No user id found")
            return
        }
        const result = await setUserData(
            form.username, 
            form.imageUrl, 
            form.mail, 
            form.dateOfBirth, 
            userId
        )
        if(result) {
            console.log("User data set successfully", result)
            setIsOpen(false)
        } else {
            console.error("Failed to set user data", error)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, user, setUserData])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        submitUserData()
    }

    if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-twitch-ice bg-opacity-50">
        <div className="bg-white text-gray-700 rounded-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl" onClick={() => setIsOpen(false)} aria-label="Close">
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Onboarding</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                        Username
                    </label>
                    <input type="text" id="username" name="username" onChange={handleChange} value={form.username} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                        Profile Image
                    </label>
                    <input type="url" id="imageUrl" name="imageUrl" onChange={handleChange} value={form.imageUrl} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                    <label htmlFor="mail" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input type="mail" id="mail" name="mail" onChange={handleChange} value={form.mail} required disabled={form.mail !== ''} className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${form.mail !== '' ? 'bg-gray-100 opacity-70' : ''}`} />
                </div>
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">
                        Date of Birth
                    </label>
                    <input type="date" id="dateOfBirth" name="dateOfBirth" onChange={handleChange} value={form.dateOfBirth} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition">
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}
export default Onboarding