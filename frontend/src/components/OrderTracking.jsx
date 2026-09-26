import { useState, useEffect } from "react";
import { getOrderById } from "../api/orderApi";
import { FiX, FiChevronUp } from "react-icons/fi";
import PaymentSection from "./PaymentSection";

const statusLabels = {
    pending: "Order Received",
    preparing: "Preparing",
    ready: "Ready",
    served: "Served",
};

const OrderTracking = ({ currentOrder, onClose, callWaiter, viewBill, bill }) => {
    const [liveOrder, setLiveOrder] = useState(currentOrder);
    const [waiterCalled, setWaiterCalled] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [showBill, setShowBill] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            const updatedOrder = await getOrderById(currentOrder._id);
            setLiveOrder(updatedOrder);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentOrder._id]);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-3 sm:px-0 pb-3 sm:pb-4">
            <div className="bg-white w-full sm:max-w-md rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
                <button
                    onClick={() => setExpanded((e) => !e)}
                    className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#2D5F3E] rounded-full flex items-center justify-center shrink-0">
                            <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="text-left">
                            <p className="font-[Poppins] font-semibold text-sm text-[#1A1A1A]">
                                Table {liveOrder.tableNumber} • ₹{liveOrder.totalAmount}
                            </p>
                            <p className="font-[Poppins] text-xs text-[#2D5F3E] font-medium">
                                {statusLabels[liveOrder.status] || liveOrder.status}
                            </p>
                        </div>
                    </div>
                    <FiChevronUp
                        className={`text-[#767676] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                        size={20}
                    />
                </button>

                {expanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-stone-100 flex flex-col gap-2">
                        <button
                            onClick={async () => {
                                await callWaiter();
                                setWaiterCalled(true);
                            }}
                            disabled={waiterCalled}
                            className={`font-[Poppins] font-medium text-sm px-4 py-2 rounded-full cursor-pointer transition-colors ${waiterCalled
                                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                                : "bg-white border border-[#2D5F3E] text-[#2D5F3E] hover:bg-[#2D5F3E]/5"
                                }`}
                        >
                            {waiterCalled ? "Waiter Called ✓" : "Call Waiter"}
                        </button>
                        <button
                            onClick={async () => {
                                if (!showBill) await viewBill();
                                setShowBill((s) => !s);
                            }}
                            className="font-[Poppins] font-medium text-sm px-4 py-2 rounded-full border border-neutral-300 text-[#1A1A1A] cursor-pointer hover:bg-neutral-50 transition-colors"
                        >
                            {showBill ? "Hide Bill" : "View Bill"}
                        </button>

                        {showBill && bill && (
                            <div className="bg-[#FAF7F2] p-3 rounded-xl text-sm font-[Poppins]">
                                <div className="flex justify-between text-[#767676]"><span>Subtotal</span><span>₹{bill.subTotal}</span></div>
                                <div className="flex justify-between text-[#767676]"><span>Tax</span><span>₹{bill.tax}</span></div>
                                <div className="flex justify-between text-[#767676]"><span>Service Charge</span><span>₹{bill.serviceCharge}</span></div>
                                <div className="flex justify-between font-bold text-[#1A1A1A] border-t border-stone-200 mt-1.5 pt-1.5"><span>Total</span><span>₹{bill.total}</span></div>
                            </div>
                        )}

                        <PaymentSection currentOrder={currentOrder} />

                        <button
                            onClick={onClose}
                            className="font-[Poppins] text-xs text-[#767676] cursor-pointer hover:text-[#1A1A1A] transition-colors mt-1"
                        >
                            Dismiss
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderTracking