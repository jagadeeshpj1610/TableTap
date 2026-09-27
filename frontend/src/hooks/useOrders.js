import { useState, useEffect, useCallback } from "react";
import { getAllOrders } from "../api/orderApi";
import toast from "react-hot-toast";

export function useOrders(pollMs = 5000) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = useCallback(async () => {
        try {
            setError("");
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            setError("Could not load orders. Is the backend running?");
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, pollMs);
        return () => clearInterval(interval);
    }, [fetchOrders, pollMs]);

    return { orders, setOrders, loading, error, refetch: fetchOrders };
}