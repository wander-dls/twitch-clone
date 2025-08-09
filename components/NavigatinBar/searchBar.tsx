import { Search } from "../Icons"

const SearchBar = () => {
  return (
    <div className="flex max-w-md w-full">
        <input
            type="text"
            placeholder="Search"
            className="w-full bg-white border-[1px] p-1 text-sm rounded-l-md border-slate-400"
        />
        <button className="bg-gray-200 text-black p-[0.3rem] rounded-r-md">
            <Search />
        </button>
    </div>
  )
}
export default SearchBar