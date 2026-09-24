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
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="font-[Fraunces] text-2xl font-semibold text-[#1A1A1A] mb-6">Waiter Calls</h1>

            {pendingCalls.length === 0 ? (
                <p className="text-[#767676] text-center py-12">No pending waiter calls.</p>
            ) : (
                <div className="space-y-3">
                    {pendingCalls.map((call) => (
                        <div key={call._id} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border-l-4 border-amber-500">
                            <div>
                                <p className="font-[Fraunces] text-lg font-semibold text-[#1A1A1A]">Table {call.tableNumber}</p>
                                <p className="text-xs text-[#767676]">{new Date(call.createdAt).toLocaleTimeString()}</p>
                            </div>
                            <button
                                onClick={() => handleResolve(call._id)}
                                className="bg-[#2D5F3E] text-white px-4 py-2 rounded-full text-sm font-medium"
                            >
                                Resolve
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminWaiterCalls