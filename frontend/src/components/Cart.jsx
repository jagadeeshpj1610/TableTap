// const Cart = ({ cartItems, updateQuantity, onClose, placeOrder }) => {
//     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     return (
//         <div className="fixed inset-0 bg-[#FAF7F2] z-50 flex flex-col">
//             <div className="flex justify-between items-center p-6">
//                 <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Your Cart</h2>
//                 <button onClick={onClose} className="text-sm text-[#767676]">Close</button>
//             </div>

//             <div className="flex-1 overflow-y-auto px-6">
//                 {cartItems.map((cartItem) => (
//                     <div key={cartItem.menuItem} className="flex justify-between items-center bg-white p-4 rounded-xl mb-3 shadow-sm">
//                         <div>
//                             <h3 className="font-medium text-[#1A1A1A]">{cartItem.name}</h3>
//                             <p className="text-sm text-[#767676]">₹{cartItem.price}</p>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <button onClick={() => updateQuantity(cartItem.menuItem, -1)} className="w-7 h-7 rounded-full border border-neutral-300 text-[#1A1A1A]">-</button>
//                             <span className="text-[#1A1A1A]">{cartItem.quantity}</span>
//                             <button onClick={() => updateQuantity(cartItem.menuItem, 1)} className="w-7 h-7 rounded-full border border-neutral-300 text-[#1A1A1A]">+</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="p-6 border-t border-neutral-200 bg-white">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold text-[#1A1A1A]">Total</h3>
//                     <h3 className="text-lg font-semibold text-[#1A1A1A]">₹{totalPrice}</h3>
//                 </div>
//                 <button
//                     onClick={placeOrder}
//                     className="w-full bg-[#8B2635] text-white py-3 rounded-full font-medium"
//                 >
//                     Place Order
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default Cart

import { FiX } from "react-icons/fi"

const Cart = ({ cartItems, updateQuantity, onClose, placeOrder }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            />

            <div className="relative bg-[#FAF7F2] w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl max-h-[85vh] flex flex-col shadow-xl">
                <div className="flex justify-between items-center px-5 py-4 border-b border-stone-200">
                    <h2 className="font-[Poppins] font-bold text-xl text-[#1A1A1A]">Your Cart</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close cart"
                        className="cursor-pointer p-2.5 rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-colors"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {cartItems.length === 0 ? (
                        <p className="font-[Poppins] text-sm text-[#767676] text-center py-10">
                            Your cart is empty.
                        </p>
                    ) : (
                        cartItems.map((cartItem) => (
                            <div key={cartItem.menuItem} className="flex justify-between items-center bg-white p-3.5 rounded-xl mb-3 shadow-sm">
                                <div>
                                    <h3 className="font-[Poppins] font-semibold text-[#1A1A1A]">{cartItem.name}</h3>
                                    <p className="font-[Poppins] text-sm text-[#767676]">₹{cartItem.price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateQuantity(cartItem.menuItem, -1)}
                                        className="cursor-pointer w-7 h-7 rounded-full border border-neutral-300 text-[#1A1A1A] hover:bg-neutral-100 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="font-[Poppins] font-medium text-[#1A1A1A] w-4 text-center">
                                        {cartItem.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(cartItem.menuItem, 1)}
                                        className="cursor-pointer w-7 h-7 rounded-full border border-neutral-300 text-[#1A1A1A] hover:bg-neutral-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="px-5 py-4 border-t border-neutral-200 bg-white sm:rounded-b-2xl">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-[Poppins] font-semibold text-lg text-[#1A1A1A]">Total</h3>
                            <h3 className="font-[Poppins] font-bold text-lg text-[#1A1A1A]">₹{totalPrice}</h3>
                        </div>
                        <button
                            onClick={placeOrder}
                            className="cursor-pointer w-full bg-[#2D5F3E] hover:bg-[#244c32] transition-colors text-white py-3 rounded-full font-[Poppins] font-bold"
                        >
                            Place Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart