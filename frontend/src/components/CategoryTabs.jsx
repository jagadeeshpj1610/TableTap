

const CategoryTabs = ({ selectedCategory, setSelectedCategory }) => {
    const categories = ["All", "Starters", "Main Course", "Biryani", "Snacks", "Drinks", "Desserts"]

    return (
        <div className="flex gap-2 pb-2 overflow-x-auto px-6 py-4">
            {categories.map((category) =>
                <div key={category} onClick={() => { setSelectedCategory(category) }} className={selectedCategory === category
                    ? "bg-[#8B2635] text-white px-5 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer"
                    : "bg-white text-[#1A1A1A] border border-neutral-200 px-5 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer"}
                >
                    {category}
                </div>
            )
            }
        </div >
    )
}

export default CategoryTabs