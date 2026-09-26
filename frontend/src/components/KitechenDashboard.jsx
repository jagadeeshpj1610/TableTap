import { useState, useEffect } from "react"
import { getAllOrders, updateOrderStatus } from "../api/orderApi"
import { FiClock } from "react-icons/fi"

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOrders()
            setOrders(data)
        };
        fetchData()

        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [])

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        const updatedOrder = await updateOrderStatus(orderId, newStatus);
        setOrders(orders.map((order) => order._id === orderId ? updatedOrder : order))
    }

    const statusStyles = {
        pending: {
            border: "border-red-500",
            badge: "bg-red-500/10 text-red-400 ring-red-500/30",
            button: "bg-red-500 hover:bg-red-600 text-white",
            label: "Accept Order",
            next: "preparing",
        },
        preparing: {
            border: "border-blue-500",
            badge: "bg-blue-500/10 text-blue-400 ring-blue-500/30",
            button: "bg-blue-600 hover:bg-blue-700 text-white",
            label: "Mark Ready",
            next: "ready",
        },
        ready: {
            border: "border-emerald-500",
            badge: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
            button: "bg-emerald-600 hover:bg-emerald-700 text-white",
            label: "Served",
            next: "served",
        },
    };

    const activeOrders = orders
        .filter((order) => order.status !== "served")
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <div className="min-h-screen bg-[#1A1A1A]">
            <header className="bg-[#1A1A1A] border-b border-stone-800 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-[Poppins] font-extrabold text-lg text-white tracking-tight">
                            TableTap
                        </h2>
                        <p className="font-[Poppins] text-xs font-medium text-neutral-400 mt-0.5">
                            Kitchen Display
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
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                            Kitchen Orders
                        </h1>
                        <p className="font-[Poppins] text-sm text-neutral-400 mt-1">
                            {activeOrders.length} active {activeOrders.length === 1 ? "order" : "orders"} · oldest first
                        </p>
                    </div>
                </div>

                {activeOrders.length === 0 ? (
                    <div className="bg-[#242424] rounded-2xl py-16 text-center">
                        <p className="font-[Poppins] text-neutral-400 text-sm">No active orders right now.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {activeOrders.map((order, index) => {
                            const style = statusStyles[order.status] || statusStyles.pending;
                            return (
                                <div
                                    key={order._id}
                                    className={`bg-[#242424] rounded-2xl p-5 border-l-4 ${style.border} min-h-[220px] flex flex-col`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-[Poppins] font-bold text-[10px] text-neutral-500 border border-neutral-600 rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                                                    {index + 1}
                                                </span>
                                                <p className="font-[Poppins] font-bold text-lg text-white">
                                                    Table {order.tableNumber}
                                                </p>
                                            </div>
                                            <p className="font-[Poppins] flex items-center gap-1 text-xs text-neutral-400 mt-0.5 ml-7">
                                                <FiClock size={12} />
                                                {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                        <span
                                            className={`font-[Poppins] px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ring-inset shrink-0 ${style.badge}`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>

                                    <ul className="flex-1 divide-y divide-neutral-700">
                                        {order.items.map((item) => (
                                            <li
                                                key={item._id}
                                                className="font-[Poppins] flex justify-between gap-3 py-1.5 text-sm text-neutral-200"
                                            >
                                                <span className="min-w-0 truncate">
                                                    {item.menuItem ? item.menuItem.name : "Item unavailable"}
                                                </span>
                                                <span className="shrink-0 font-semibold text-emerald-400">
                                                    ×{item.quantity}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleUpdateOrderStatus(order._id, style.next)}
                                        className={`font-[Poppins] font-bold w-full mt-4 py-2.5 rounded-full text-sm cursor-pointer transition-colors ${style.button}`}
                                    >
                                        {style.label}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default KitchenDashboard