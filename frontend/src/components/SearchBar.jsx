

const SearchBar = ({searchTerm, setSearchTerm}) => {
    return(
        <input type="text" placeholder="Search Dishes.." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
    )
}

export default SearchBar