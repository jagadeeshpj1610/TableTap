import { useState, useEffect, useCallback } from "react";
import { getAllWaiterCalls, resolveWaiterCall } from "../api/waiterApi";
import toast from "react-hot-toast";

export function useWaiterCalls(pollMs = 5000) {
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCalls = useCallback(async () => {
        try {
            const data = await getAllWaiterCalls();
            setCalls(data);
        } catch (err) {
            toast.error("Failed to load waiter calls");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCalls();
        const interval = setInterval(fetchCalls, pollMs);
        return () => clearInterval(interval);
    }, [fetchCalls, pollMs]);

    const resolveCall = async (id) => {
        try {
            const updated = await resolveWaiterCall(id);
            setCalls((prev) => prev.map((c) => (c._id === id ? updated : c)));
            toast.success(`Table ${updated.tableNumber} resolved`);
        } catch (err) {
            toast.error("Failed to resolve call");
        }
    };

    return { calls, loading, resolveCall };
}