import Image from "next/image"
import Link from "next/link"
import twitchPurple from "@/app/twitch-purple.svg"
import { Button } from "../button/button"
import { EllipsisVertical } from "../Icons"
import SearchBar from "./searchBar"
import TrailingItems from "./trailingItems"


const NavigationBar = () => {
  return (
    <header>
        <nav className="flex w-full text-black items-center justify-between bg-white p-2 border-b border-slate-300">
          <div className="flex items-center gap-6">
            <Link href={'/'}>
              <Image src={twitchPurple} alt="Twitch Logo" width={32} height={32}  className="cursor-pointer"
              />
            </Link>
            <Link href={'/browse'} className="text-black font-bold">
              Browse
            </Link>
            <Button variant={'icon'}>
              <EllipsisVertical />
            </Button>
          </div>
          <SearchBar />
          <TrailingItems />
        </nav>
    </header>
  )
}
export default NavigationBar