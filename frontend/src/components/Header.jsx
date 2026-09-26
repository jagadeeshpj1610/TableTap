
// import { FiShoppingCart } from "react-icons/fi";

// const Header = ({ cartCount, onCartClick , tableNumber}) => {
//     return (
//         <div className="bg-[#FAF7F2] p-6 flex justify-between items-center">
//             <div>
//                 <h1 className="font-bold text-2xl text-[#1A1A1A]">TableTap</h1>
//                 <p className="text-sm text-[#767676]">Scan . Order . Relax</p>
//             </div>
//             <div className="flex items-center gap-3">
//                 <div className="relative" onClick={onCartClick}>
//                     <FiShoppingCart className="text-xl text-[#1A1A1A]" size={22} />
//                     {cartCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-[#8B2635] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                             {cartCount}
//                         </span>
//                     )}
//                 </div>
//                 <span className="bg-[#8B2635] text-white px-4 py-1 rounded-full text-sm font-medium">Table {tableNumber}</span>
//             </div>
//         </div>
//     )
// }

// export default Header

import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Header = ({ cartCount, onCartClick, tableNumber }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#1A1A1A] px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
            <div onClick={() => navigate("/")} className="cursor-pointer">
                <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl text-white leading-tight tracking-tight">
                    TableTap
                </h1>
                <p className="font-[Poppins] font-semibold text-sm sm:text-base text-neutral-400">
                    Scan . Order . Relax
                </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
                <button
                    onClick={onCartClick}
                    aria-label="Open cart"
                    className="relative cursor-pointer p-2.5 rounded-full bg-white/5 hover:bg-white/15 transition-all duration-200 hover:scale-110 active:scale-95"
                >
                    <FiShoppingCart className="text-white" size={28} />
                    {cartCount > 0 && (
                        <span className="font-[Poppins] absolute top-0 right-0 bg-[#2D5F3E] text-white text-xs font-bold w-5 h-5 min-w-[20px] min-h-[20px] flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    )}
                </button>
                <span className="font-[Poppins] bg-[#2D5F3E] text-white px-4 py-2 rounded-full text-sm sm:text-base font-bold whitespace-nowrap">
                    Table {tableNumber}
                </span>
            </div>
        </div>
    )
}

export default Header