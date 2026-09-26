const CategoryTabs = ({ selectedCategory, setSelectedCategory }) => {
    const categories = ["All", "Starters", "Main Course", "Biryani", "Snacks", "Drinks", "Desserts"]

    return (
        <div className="sticky top-0 z-10 bg-[#FAF7F2] shadow-sm">
            <div className="flex gap-2.5 overflow-x-auto px-4 sm:px-6 py-3 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`font-[Poppins] font-semibold px-5 py-2.5 rounded-full text-sm sm:text-base whitespace-nowrap cursor-pointer transition-colors shrink-0 ${
                            selectedCategory === category
                                ? "bg-[#2D5F3E] text-white"
                                : "bg-white text-[#1A1A1A] border border-neutral-200 hover:bg-neutral-50"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryTabs