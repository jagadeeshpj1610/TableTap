import { FiSearch, FiX } from "react-icons/fi"

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="px-4 sm:px-6 py-3 bg-[#FAF7F2]">
            <div className="relative">
                <FiSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="Search Dishes.."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="font-[Poppins] font-medium w-full pl-11 pr-10 py-3 rounded-full bg-white shadow-sm border border-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2D5F3E] transition-shadow"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm("")}
                        aria-label="Clear search"
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-full hover:bg-neutral-100 transition-colors"
                    >
                        <FiX className="text-neutral-500" size={18} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchBar