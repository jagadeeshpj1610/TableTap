import { useState } from "react"
import { createPayment } from "../api/paymentApi"
import toast from "react-hot-toast"

const PaymentSection = ({ currentOrder }) => {
    const [showPayment, setShowPayment] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);

    const handlePayment = async (method) => {
        try {
            await createPayment(currentOrder._id, currentOrder.totalAmount, method);
            setPaymentDone(true);
            toast.success("Payment recorded");
        } catch (err) {
            toast.error("Failed to record payment");
        }
    };

    if (paymentDone) {
        return (
            <p className="font-[Poppins] font-medium text-sm text-[#2D5F3E] mb-4">
                Payment recorded — awaiting confirmation ✓
            </p>
        );
    }

    if (!showPayment) {
        return (
            <button
                onClick={() => setShowPayment(true)}
                className="font-[Poppins] font-bold bg-[#2D5F3E] hover:bg-[#244c32] text-white px-6 py-2.5 rounded-full text-sm cursor-pointer transition-colors mb-4"
            >
                Pay Now
            </button>
        );
    }

    return (
        <div className="bg-white p-4 rounded-2xl w-full max-w-xs mb-4 shadow-sm">
            <p className="font-[Poppins] font-semibold text-sm text-[#1A1A1A] mb-3">
                Choose payment method
            </p>
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => handlePayment("cash")}
                    className="font-[Poppins] font-medium border border-stone-300 text-[#1A1A1A] py-2.5 rounded-xl text-sm cursor-pointer hover:bg-stone-50 transition-colors"
                >
                    Cash
                </button>
                <button
                    onClick={() => handlePayment("card")}
                    className="font-[Poppins] font-medium border border-stone-300 text-[#1A1A1A] py-2.5 rounded-xl text-sm cursor-pointer hover:bg-stone-50 transition-colors"
                >
                    Card (Pay at counter)
                </button>
                <button
                    onClick={() => handlePayment("online")}
                    className="font-[Poppins] font-medium border border-stone-300 text-[#1A1A1A] py-2.5 rounded-xl text-sm cursor-pointer hover:bg-stone-50 transition-colors"
                >
                    UPI (Scan restaurant's QR)
                </button>
            </div>
        </div>
    );
};

export default PaymentSection;