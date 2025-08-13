import { Tables } from "@/database/database.types"
import Image from "next/image"
import { redirect } from "next/navigation"
import Badge from "./Badge"
import { categories } from "@/lib/types/category"

const HomeFeed = ({livestreams}:{livestreams: Tables<'livestreams'>[]}) => {
  return (
    <div className="bg-white w-full text-gray-400 overflow-y-scroll">
        <section className="p-4">
            <h2 className="text-lg text-twitch-purple p-2 tracking-tight">
                Live on Twitch
            </h2>
            <div className="grid grid-cols-3 gap-3">
                {livestreams.map((livestream) => (
                    <button key={livestream.id} onClick={() => {
                        console.log('redirecting to /app/', livestream.username)
                        redirect(`/app/${livestream.username}`)
                    }} className="cursor-pointer">
                        <div className="relative bg-twitch-purple aspect-video">
                            <div className="absolute top-0 left-0 w-full h-full hover-raise">
                                <Image src={livestream.imageUrl} alt={livestream.name} 
                                objectFit="cover" fill   />
                                <p className="absolute top-2 left-2 bg-red-600 text-white uppercase text-sm font-semibold px-1">
                                    Live
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-2 py-2">
                            <Image src={livestream.imageUrl} alt={livestream.name} width={40} height={40} className="rounded-full" />
                            <div className="flex flex-col">
                                <h3 className="text-sm font-bold text-gray-500 text-semibold pb-1 text-start">
                                    {livestream.name}
                                </h3>
                                <p className="text-sm text-start text-gray-500">
                                    {livestream.username}
                                </p>
                                <p className="flex items-center gap-2 pt-0.5">
                                    {livestream.categories.map((category, index) => (
                                        <Badge key={index} text={category} />
                                    ))}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </section>
        <section className="p-4">
            <h2 className="text-lg tracking-tight">
                <span className="text-twitch-purple">Categories</span> we think you&apos;ll like
            </h2>
            <div className="grid grid-cols-6 gap-3">
                {categories.map((category) => (
                    <div key={category.id}>
                        <div className="relative bg-twitch-purple aspect-[3/4]">
                            <div className="absolute top-0 left-0 w-full h-full hover-raise">
                                <Image src={category.image} alt={category.name} 
                                layout="fill" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-sm font-semibold text-gray-500">
                                {category.name}
                            </p>
                            {category.tags && (
                                <div className="flex items-center flex-wrap gap-2">
                                    {category.tags.map((tag) => (
                                        <Badge key={tag} text={tag} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
  )
}
export default HomeFeed