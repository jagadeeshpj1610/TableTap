

const CategoryTabs = ({ selectedCategory, setselectedCategory }) => {
    const categories = ["All", "starter", "Main Course", "Biryani", "snacks", "drinks", "Desserts"]

    return (
        <div>
            {categories.map((category) =>
                <div key={category} onClick={setselectedCategory} className={selectedCategory === category
                    ? "bg-[#8B2635] text-white px-4 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer"
                    : "bg-white text-[#1A1A1A] border border-neutral-200 px-4 py-2 rounded-full text-sm whitespace-nowrap cursor-pointer"}
                >
                    {category}
                </div>
            )
            }
        </div >
    )
}