

const FoodCard = ({ image, name, description, price, isVeg, onAdd }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm">
            <img src={image} alt={name} className="w-full h-44 object-cover" />
            <div className="p-4 flex flex-col gap-1">
                <div className={isVeg ? "w-3 h-3 bg-green-600 border border-green-800" : "w-3 h-3 bg-red-700 border border-red-900"}></div>
                <h3 className="font-serif text-lg font-bold text-neutral-900 leading-snug">{name}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">{description}</p>
                <div className="flex items-center justify-between mt-2">
                    <h4 className="text-base font-semibold text-neutral-900">₹{price}</h4>
                    <button onClick={onAdd} className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-1.5 rounded-full transition active:scale-95">Add</button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard