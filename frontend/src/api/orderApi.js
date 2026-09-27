import { authHeader } from "../utils/auth"

const defaultApi = import.meta.env.VITE_API_URL;

const createOrder = async (tableNumber, orderItems) => {
    try {
        const response = await fetch(`${defaultApi}/api/orders`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ tableNumber, items: orderItems })
        })
        return await response.json()
    } catch (error) {
        console.error("failed to place the order : ", error);
    }
}

const getAllOrders = async () => {
    try {
        const response = await fetch(`${defaultApi}/api/orders`, {
            headers: { ...authHeader() }
        })
        return await response.json();
    } catch (error) {
        console.error("failed to fetch the orders :", error);
    }
}

const getOrderById = async (id) => {
    try {
        const response = await fetch(`${defaultApi}/api/orders/${id}`);
        return await response.json();
    } catch (error) {
        console.error("failed to fetch the order:", error);
    }
};

const getOrderBill = async (id) => {
    try {
        const response = await fetch(`${defaultApi}/api/orders/${id}/bill`)
        return await response.json()
    } catch (error) {
        console.error("get the order bill was failed : ", error);
    }
}

const updateOrderStatus = async (id, status) => {
    try {
        const response = await fetch(`${defaultApi}/api/orders/${id}/status`, {
            method: "PATCH",
            headers: { "content-type": "application/json", ...authHeader() },
            body: JSON.stringify({ status })
        })
        return await response.json();
    } catch (error) {
        console.error("failed to update the order status : ", error);
    }
}

export { createOrder, getOrderById, getOrderBill, getAllOrders, updateOrderStatus }