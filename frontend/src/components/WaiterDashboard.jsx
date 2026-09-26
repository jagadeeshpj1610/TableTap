import { useState, useEffect } from "react"
import { getAllWaiterCalls, resolveWaiterCall } from "../api/waiterApi"
import { getAllTables } from "../api/tableApi"
import { getAllOrders } from "../api/orderApi"
import { FiBell, FiGrid, FiClipboard } from "react-icons/fi"

const WaiterDashboard = () => {
    const [calls, setCalls] = useState([])
    const [tables, setTables] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getAllOrders();
            setOrders(data);
        };
        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [])

    const activeOrders = orders.filter((order) => order.status !== "served");

    useEffect(() => {
        const fetchTables = async () => {
            const data = await getAllTables();
            setTables(data);
        };
        fetchTables();
    }, [])

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

    const orderStatusStyles = {
        pending: "bg-red-500/10 text-red-400 ring-red-500/30",
        preparing: "bg-blue-500/10 text-blue-400 ring-blue-500/30",
        ready: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
    };

    return (
        <div className="min-h-screen bg-[#1A1A1A]">
            <header className="bg-[#1A1A1A] border-b border-stone-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-[Poppins] font-extrabold text-lg text-white tracking-tight">
                            TableTap
                        </h2>
                        <p className="font-[Poppins] text-xs font-medium text-neutral-400 mt-0.5">
                            Waiter Dashboard
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                        </span>
                        <span className="font-[Poppins] text-xs font-semibold text-neutral-400">
                            Live
                        </span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <FiBell className="text-neutral-400" size={16} />
                        <h2 className="font-[Poppins] font-bold text-lg text-white">Waiter Calls</h2>
                    </div>
                    {pendingCalls.length === 0 ? (
                        <div className="bg-[#242424] rounded-2xl py-10 text-center">
                            <p className="font-[Poppins] text-neutral-400 text-sm">No pending calls.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingCalls.map((call) => (
                                <div
                                    key={call._id}
                                    className="bg-[#242424] rounded-2xl p-4 flex items-center justify-between gap-4 border-l-4 border-amber-500"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                                            <FiBell size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-[Poppins] font-bold text-white">
                                                Table {call.tableNumber} is requesting a waiter
                                            </p>
                                            <p className="font-[Poppins] text-xs text-neutral-400">
                                                {new Date(call.createdAt).toLocaleTimeString("en-IN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleResolve(call._id)}
                                        className="font-[Poppins] font-bold shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-full text-sm cursor-pointer transition-colors"
                                    >
                                        Resolve
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <FiGrid className="text-neutral-400" size={16} />
                        <h2 className="font-[Poppins] font-bold text-lg text-white">Tables</h2>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                        {tables.map((table) => (
                            <div
                                key={table._id}
                                className="bg-[#242424] rounded-2xl p-4 text-center"
                            >
                                <p className="font-[Poppins] text-xl font-extrabold text-white">
                                    {table.tableNumber}
                                </p>
                                <span
                                    className={`font-[Poppins] mt-1.5 inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ring-inset ${
                                        table.status === "available"
                                            ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
                                            : "bg-amber-500/10 text-amber-400 ring-amber-500/30"
                                    }`}
                                >
                                    {table.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <FiClipboard className="text-neutral-400" size={16} />
                        <h2 className="font-[Poppins] font-bold text-lg text-white">Active Orders</h2>
                    </div>
                    {activeOrders.length === 0 ? (
                        <div className="bg-[#242424] rounded-2xl py-10 text-center">
                            <p className="font-[Poppins] text-neutral-400 text-sm">No active orders.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {activeOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-[#242424] rounded-2xl p-4"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-[Poppins] font-bold text-white">
                                            Table {order.tableNumber}
                                        </p>
                                        <span
                                            className={`font-[Poppins] px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ring-inset ${
                                                orderStatusStyles[order.status] || orderStatusStyles.pending
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="font-[Poppins] text-sm text-neutral-400">
                                        {order.items.length} {order.items.length === 1 ? "item" : "items"} · ₹{order.totalAmount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default WaiterDashboard