import { useState, useEffect, useCallback } from "react";
import { getAllOrders } from "../api/orderApi";
import { socket } from "../../socket";
import toast from "react-hot-toast";

export function useOrders() {
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

        socket.on("orders:changed", fetchOrders); 
        socket.on("connect", fetchOrders);        

        return () => {
            socket.off("orders:changed", fetchOrders);
            socket.off("connect", fetchOrders);
        };
    }, [fetchOrders]);

    return { orders, setOrders, loading, error, refetch: fetchOrders };
}