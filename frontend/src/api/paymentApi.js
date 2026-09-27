import { authHeader } from "../utils/auth"

const defaultApi = import.meta.env.VITE_API_URL;

const createPayment = async (orderId, amount, paymentMethod) => {
    try {
        const response = await fetch(`${defaultApi}/payments`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ orderId, amount, paymentMethod })
        });
        return await response.json();
    } catch (error) {
        console.error("failed to create payment:", error);
    }
};

const updatePaymentStatus = async (paymentId, status) => {
    try {
        const response = await fetch(`${defaultApi}/payments/${paymentId}/status`, {
            method: "PATCH",
            headers: { "Content-type": "application/json", ...authHeader() },
            body: JSON.stringify({ status })
        });
        return await response.json();
    } catch (error) {
        console.error("failed to update payment status:", error);
    }
};

const getAllPayments = async () => {
    try {
        const response = await fetch(`${defaultApi}/payments`, {
            headers: { ...authHeader() }
        });
        return await response.json();
    } catch (error) {
        console.error("failed to fetch payments:", error);
    }
};

export { createPayment, updatePaymentStatus, getAllPayments };