

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <input type="text" placeholder="Search Dishes.." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-2 mt-2  rounded-full border border-neutral-200 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
    )
}

export default SearchBar