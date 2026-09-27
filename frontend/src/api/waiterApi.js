import { authHeader } from "../utils/auth"

const defaultApi = import.meta.env.VITE_API_URL;

const createWaiterCall = async (tableNumber) => {
    try {
        const response = await fetch(`${defaultApi}/waiter-call/call`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ tableNumber })
        })
        return await response.json()
    } catch (error) {
        console.error("failed to create a waiter call:", error);
    }
}

const getAllWaiterCalls = async () => {
    try {
        const response = await fetch(`${defaultApi}/waiter-call`, {
            headers: { ...authHeader() }
        })
        return await response.json();
    } catch (error) {
        console.error("failed to fetch the waiter-calls", error);
    }
}

const resolveWaiterCall = async (id) => {
    try {
        const response = await fetch(`${defaultApi}/waiter-call/${id}/resolve`, {
            method: "PATCH",
            headers: { ...authHeader() }
        })
        return await response.json();
    } catch (error) {
        console.error("failed to resolve the waiter call", error);
    }
}

export { createWaiterCall, getAllWaiterCalls, resolveWaiterCall }