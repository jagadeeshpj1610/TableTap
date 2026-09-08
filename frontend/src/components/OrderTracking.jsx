const OrderTracking = ({ currentOrder, onClose }) => {
    return (
        <div className="fixed inset-0 bg-[#FAF7F2] z-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-[#2D5F3E] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-3xl">✓</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">Order Placed Successfully!</h2>
            <p className="text-[#767676] mb-6">Table {currentOrder.tableNumber} • ₹{currentOrder.totalAmount}</p>
            
            <div className="bg-white px-6 py-3 rounded-full mb-6">
                <p className="text-sm font-medium text-[#8B2635] capitalize">{currentOrder.status}</p>
            </div>

            <button 
                onClick={onClose}
                className="text-sm text-[#767676] underline"
            >
                Back to Menu
            </button>
        </div>
    )
}

export default OrderTracking