const defaultApi = "import.meta.env.VITE_API_URL";

const createPayment = async (orderId, amount, paymentMethod) => {
    try {
        const response = await fetch(`${defaultApi}/payments`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ orderId, amount, paymentMethod })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed to create payment:", error);
    }
};

const updatePaymentStatus = async (paymentId, status) => {
    try {
        const response = await fetch(`${defaultApi}/payments/${paymentId}/status`, {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ status })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed to update payment status:", error);
    }
};



export { createPayment, updatePaymentStatus };