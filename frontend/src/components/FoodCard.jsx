import { FiPlus } from "react-icons/fi"

const FoodCard = ({ image, name, description, price, isVeg, onAdd }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] overflow-hidden w-full border border-stone-100 flex flex-col">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                    className={`absolute top-2 left-2 w-5 h-5 rounded-[3px] border-[1.5px] flex items-center justify-center bg-white shadow-sm ${isVeg ? "border-green-600" : "border-red-700"
                        }`}
                >
                    <div className={`w-2.5 h-2.5 rounded-full ${isVeg ? "bg-green-600" : "bg-red-700"}`} />
                </div>
            </div>
            <div className="p-2.5 sm:p-3 flex flex-col gap-0.5 flex-1">
                <h3 className="font-[Poppins] font-bold text-sm sm:text-base text-[#1A1A1A] leading-tight line-clamp-1">
                    {name}
                </h3>
                <p className="font-[Poppins] text-xs text-[#767676] leading-snug line-clamp-1">
                    {description}
                </p>
                <div className="flex items-center mt-auto pt-1.5">
                    <span className="font-[Poppins] font-bold text-base sm:text-lg text-[#1A1A1A]">
                        ₹{price}
                    </span>
                    <button
                        onClick={onAdd}
                        aria-label={`Add ${name}`}
                        className="ml-auto w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-full bg-[#2D5F3E] hover:bg-[#244c32] text-white cursor-pointer transition-all duration-200 hover:scale-110 hover:rotate-90 active:scale-90"
                    >
                        <FiPlus size={18} className="sm:hidden" />
                        <FiPlus size={20} className="hidden sm:block" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FoodCard