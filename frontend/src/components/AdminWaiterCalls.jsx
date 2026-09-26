import { useState, useEffect } from "react"
import { getAllWaiterCalls, resolveWaiterCall } from "../api/waiterApi"
import { FiBell } from "react-icons/fi"

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
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
            <div className="mb-8">
                <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                    Waiter Calls
                </h1>
                <p className="font-[Poppins] text-sm text-[#767676] mt-1">
                    Live requests from tables, refreshing automatically
                </p>
            </div>

            {pendingCalls.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm py-16 text-center">
                    <p className="font-[Poppins] text-[#767676] text-sm">No pending waiter calls.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {pendingCalls.map((call) => (
                        <div
                            key={call._id}
                            className="bg-white rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm border-l-4 border-amber-500"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                                    <FiBell size={18} />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-[Poppins] font-bold text-[#1A1A1A]">
                                        Table {call.tableNumber}
                                    </p>
                                    <p className="font-[Poppins] text-xs text-[#767676]">
                                        {new Date(call.createdAt).toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleResolve(call._id)}
                                className="font-[Poppins] font-bold shrink-0 bg-[#2D5F3E] hover:bg-[#244c32] text-white px-4 py-2.5 rounded-full text-sm cursor-pointer transition-colors"
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