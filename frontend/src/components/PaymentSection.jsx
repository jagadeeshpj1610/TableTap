import { useState } from "react"
import { createPayment } from "../api/paymentApi"

const PaymentSection = ({ currentOrder }) => {
    const [showPayment, setShowPayment] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);

    const handlePayment = async (method) => {
        await createPayment(currentOrder._id, currentOrder.totalAmount, method);
        setPaymentDone(true);
    };

    if (paymentDone) {
        return <p className="text-[#2D5F3E] text-sm font-medium mb-4">Payment recorded — awaiting confirmation ✓</p>;
    }

    if (!showPayment) {
        return (
            <button onClick={() => setShowPayment(true)} className="bg-[#8B2635] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                Pay Now
            </button>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl w-full max-w-xs mb-4">
            <p className="text-sm font-medium text-[#1A1A1A] mb-3">Choose payment method</p>
            <div className="flex flex-col gap-2">
                <button onClick={() => handlePayment("cash")} className="border border-neutral-300 py-2 rounded-lg text-sm">Cash</button>
                <button onClick={() => handlePayment("card")} className="border border-neutral-300 py-2 rounded-lg text-sm">Card (Pay at counter)</button>
                <button onClick={() => handlePayment("online")} className="border border-neutral-300 py-2 rounded-lg text-sm">UPI (Scan restaurant's QR)</button>
            </div>
        </div>
    );
};

export default PaymentSection;