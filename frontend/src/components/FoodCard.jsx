import { FiPlus } from "react-icons/fi"

const FoodCard = ({ image, name, description, price, isVeg, onAdd }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full max-w-sm border border-stone-100">
            <div className="relative">
                <img src={image} alt={name} className="w-full h-44 object-cover" />
                <div
                    className={`absolute top-3 left-3 w-4 h-4 rounded-sm border-2 flex items-center justify-center ${isVeg ? "border-green-600 bg-white" : "border-red-700 bg-white"
                        }`}
                >
                    <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-red-700"}`} />
                </div>
            </div>

            <div className="p-4 flex flex-col gap-1.5">
                <h3 className="font-[Fraunces] text-lg font-semibold text-[#1A1A1A] leading-snug">
                    {name}
                </h3>
                <p className="text-sm text-[#767676] leading-relaxed line-clamp-2 h-10">
                    {description}
                </p>
                <div className="flex items-center mt-2">
                    <span className="text-base font-semibold text-[#1A1A1A]">₹{price}</span>
                    <button
                        onClick={onAdd}
                        aria-label={`Add ${name}`}
                        className="ml-auto w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-[#2D5F3E] hover:bg-[#244c32] text-white cursor-pointer transition-all duration-200 hover:scale-110 hover:rotate-90 active:scale-90"
                    >
                        <FiPlus size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard