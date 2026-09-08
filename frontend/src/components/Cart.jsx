const Cart = ({ cartItems, updateQuantity, onClose }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 bg-[#FAF7F2] z-50 flex flex-col">
            <div className="flex justify-between items-center p-6">
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Your Cart</h2>
                <button onClick={onClose} className="text-sm text-[#767676]">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
                {cartItems.map((cartItem) => (
                    <div key={cartItem.menuItem} className="flex justify-between items-center bg-white p-4 rounded-xl mb-3 shadow-sm">
                        <div>
                            <h3 className="font-medium text-[#1A1A1A]">{cartItem.name}</h3>
                            <p className="text-sm text-[#767676]">₹{cartItem.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => updateQuantity(cartItem.menuItem, -1)} className="w-7 h-7 rounded-full border border-neutral-300 text-[#1A1A1A]">-</button>
                            <span className="text-[#1A1A1A]">{cartItem.quantity}</span>
                            <button onClick={() => updateQuantity(cartItem.menuItem, 1)} className="w-7 h-7 rounded-full border border-neutral-300 text-[#1A1A1A]">+</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 border-t border-neutral-200 bg-white">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">Total</h3>
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">₹{totalPrice}</h3>
                </div>
            </div>
        </div>
    )
}