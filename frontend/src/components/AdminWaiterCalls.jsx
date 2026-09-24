import { useState, useEffect } from "react"
import { getAllWaiterCalls, resolveWaiterCall } from "../api/waiterApi"

const AdminWaiterCalls = () => {
    const [calls, setCalls] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllWaiterCalls();
            setCalls(data);
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [])

    const handleResolve = async (id) => {
        const updatedCall = await resolveWaiterCall(id);
        setCalls(calls.map((call) => call._id === id ? updatedCall : call));
    };

    const pendingCalls = calls.filter((call) => call.status !== "resolved");

    return (
        <div>
            {pendingCalls.map((call) => (
                <div key={call._id}>
                    <p>Table {call.tableNumber}</p>
                    <p>{call.status}</p>
                    <button onClick={() => handleResolve(call._id)}>Resolve</button>
                </div>
            ))}
        </div>

    )
}

export default AdminWaiterCalls