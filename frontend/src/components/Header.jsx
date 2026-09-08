
import { FiShoppingCart } from "react-icons/fi";

const Header = ({ cartCount, onCartClick }) => {
    return (
        <div className="bg-[#FAF7F2] p-6 flex justify-between items-center">
            <div>
                <h1 className="font-bold text-2xl text-[#1A1A1A]">TableTap</h1>
                <p className="text-sm text-[#767676]">Scan . Order . Relax</p>
            </div>
            <div className="flex items-center gap-3">
                <div className="relative" onClick={onCartClick}>
                    <FiShoppingCart className="text-xl text-[#1A1A1A]" size={22} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#8B2635] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    )}
                </div>
                <span className="bg-[#8B2635] text-white px-4 py-1 rounded-full text-sm font-medium">Table 5</span>
            </div>
        </div>
    )
}

export default Header