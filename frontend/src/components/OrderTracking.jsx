import { useState, useEffect } from "react";
import { getOrderById } from "../api/orderApi";

const OrderTracking = ({ currentOrder, onClose, callWaiter, viewBill, bill }) => {
    const [liveOrder, setLiveOrder] = useState(currentOrder);
    console.log(bill);
    const [waiterCalled, setWaiterCalled] = useState(false);
    useEffect(() => {
        const interval = setInterval(async () => {
            const updatedOrder = await getOrderById(currentOrder._id);
            setLiveOrder(updatedOrder);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentOrder._id]);
    return (
        <div className="fixed inset-0 bg-[#FAF7F2] z-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-[#2D5F3E] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-3xl">✓</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-2">Order Placed Successfully!</h2>
            <p className="text-[#767676] mb-6">Table {liveOrder.tableNumber} • ₹{liveOrder.totalAmount}</p>

            <div className="bg-white px-6 py-3 rounded-full mb-6">
                <p className="text-sm font-medium text-[#8B2635] capitalize">{liveOrder.status}</p>
            </div>

            <button
                onClick={onClose}
                className="text-sm text-[#767676] underline"
            >
                Back to Menu
            </button>
            <button
                onClick={async () => {
                    await callWaiter();
                    setWaiterCalled(true);
                }}
                disabled={waiterCalled}
                className={waiterCalled
                    ? "bg-neutral-200 text-neutral-500 px-6 py-2 rounded-full text-sm font-medium mb-4 cursor-not-allowed"
                    : "bg-white border border-[#8B2635] text-[#8B2635] px-6 py-2 rounded-full text-sm font-medium mb-4"}
            >
                {waiterCalled ? "Waiter Called ✓" : "Call Waiter"}
            </button>
            <button
                onClick={viewBill}
                className="bg-white border border-neutral-300 text-[#1A1A1A] px-6 py-2 rounded-full text-sm font-medium mb-4"
            >
                View Bill
            </button>

            {bill && (
                <div className="bg-white p-4 rounded-xl text-sm text-left w-full max-w-xs">
                    <p>Subtotal: ₹{bill.subTotal}</p>
                    <p>Tax: ₹{bill.tax}</p>
                    <p>Service Charge: ₹{bill.serviceCharge}</p>
                    <p className="font-bold mt-2">Total: ₹{bill.total}</p>
                </div>
            )}
        </div>
    )
}

export default OrderTracking