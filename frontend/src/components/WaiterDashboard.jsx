import { useState, useEffect } from "react"
import { getAllTables } from "../api/tableApi"
import { FiBell, FiGrid, FiClipboard } from "react-icons/fi"
import toast from "react-hot-toast"
import { useWaiterCalls } from "../hooks/useWaiterCalls"
import { useOrders } from "../hooks/useOrders"

const WaiterDashboard = () => {
    const { calls, loading: callsLoading, resolveCall } = useWaiterCalls(5000);
    const { orders, loading: ordersLoading } = useOrders(5000);

    const activeOrders = orders.filter((order) => order.status !== "served");

    const pendingCalls = calls.filter((call) => call.status !== "resolved");

    const orderStatusStyles = {
        pending: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
        preparing: "bg-blue-500/10 text-blue-400 ring-blue-500/30",
        ready: "bg-[#2D5F3E]/15 text-emerald-300 ring-[#2D5F3E]/40",
    };

    return (
        <div className="min-h-screen bg-[#1F2225]">
            <header className="bg-[#1F2225] border-b border-neutral-700 sticky top-0 z-10">
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
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D5F3E] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D5F3E]"></span>
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
                    {callsLoading ? (
                        <div className="space-y-3">
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className="bg-[#2A2E32] rounded-2xl p-4 flex items-center gap-4 animate-pulse">
                                    <div className="w-11 h-11 rounded-xl bg-neutral-700 shrink-0" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 w-40 bg-neutral-700 rounded" />
                                        <div className="h-3 w-20 bg-neutral-700 rounded" />
                                    </div>
                                    <div className="h-9 w-24 bg-neutral-700 rounded-full shrink-0" />
                                </div>
                            ))}
                        </div>
                    ) : pendingCalls.length === 0 ? (
                        <div className="bg-[#2A2E32] rounded-2xl py-10 text-center shadow-sm">
                            <p className="font-[Poppins] text-neutral-400 text-sm">No pending calls.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingCalls.map((call) => (
                                <div
                                    key={call._id}
                                    className="bg-[#2A2E32] rounded-2xl p-4 flex items-center justify-between gap-4 border-l-4 border-amber-500 shadow-sm"
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
                                        onClick={() => resolveCall(call._id)}
                                        className="font-[Poppins] font-bold shrink-0 bg-[#2D5F3E] hover:bg-[#244c32] text-white px-4 py-2.5 rounded-full text-sm cursor-pointer transition-colors"
                                    >
                                        Resolve
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <FiClipboard className="text-neutral-400" size={16} />
                        <h2 className="font-[Poppins] font-bold text-lg text-white">Active Orders</h2>
                    </div>
                    {ordersLoading ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="bg-[#2A2E32] rounded-2xl p-4 animate-pulse">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="h-4 w-16 bg-neutral-700 rounded" />
                                        <div className="h-5 w-16 bg-neutral-700 rounded-full" />
                                    </div>
                                    <div className="h-3 w-24 bg-neutral-700 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : activeOrders.length === 0 ? (
                        <div className="bg-[#2A2E32] rounded-2xl py-10 text-center shadow-sm">
                            <p className="font-[Poppins] text-neutral-400 text-sm">No active orders.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {activeOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-[#2A2E32] rounded-2xl p-4 shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-[Poppins] font-bold text-white">
                                            Table {order.tableNumber}
                                        </p>
                                        <span
                                            className={`font-[Poppins] px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ring-inset ${orderStatusStyles[order.status] || orderStatusStyles.pending
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