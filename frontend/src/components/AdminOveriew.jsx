import { useState, useEffect } from "react"
import { getAllOrders } from "../api/orderApi"

const statusStyles = {
    pending: "bg-amber-100 text-amber-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-emerald-100 text-emerald-800",
    served: "bg-[#2D5F3E]/10 text-[#2D5F3E]",
}

const isToday = (date) =>
    new Date(date).toDateString() === new Date().toDateString()

const AdminOverview = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchOrders = async () => {
        try {
            setLoading(true)
            setError("")
            const data = await getAllOrders()
            setOrders(data)
        } catch (err) {
            setError("Could not load orders. Is the backend running?")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const todaysOrders = orders.filter((o) => isToday(o.createdAt))
    const todaysSales = todaysOrders.reduce((sum, o) => sum + o.totalAmount, 0)
    const pendingCount = orders.filter((o) => o.status === "pending").length
    const avgOrderValue = todaysOrders.length
        ? Math.round(todaysSales / todaysOrders.length)
        : 0
    const recentOrders = orders.slice(0, 5)

    const stats = [
        { label: "Today's Orders", value: todaysOrders.length, tint: "bg-[#8B2635]/10 text-[#8B2635]", icon: "🧾" },
        { label: "Today's Sales", value: `₹${todaysSales}`, tint: "bg-[#2D5F3E]/10 text-[#2D5F3E]", icon: "₹" },
        { label: "Pending Now", value: pendingCount, tint: "bg-amber-100 text-amber-700", icon: "⏳" },
        { label: "Avg Order Value", value: `₹${avgOrderValue}`, tint: "bg-blue-100 text-blue-700", icon: "📈" },
    ]

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h1 className="font-[Fraunces] text-3xl font-semibold text-[#1A1A1A]">
                            Overview
                        </h1>
                        <p className="text-sm text-[#767676] mt-1">
                            {new Date().toLocaleDateString("en-IN", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            })}
                        </p>
                    </div>
                    <button
                        onClick={fetchOrders}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-[#8B2635] text-white hover:bg-[#741f2c] transition"
                    >
                        Refresh
                    </button>
                </div>

                {loading && <p className="text-[#767676]">Loading...</p>}
                {error && !loading && (
                    <p className="text-[#8B2635] bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <>
                        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4 mb-8">
                            {stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm text-[#767676]">{s.label}</p>
                                        <p className="font-[Fraunces] text-3xl font-semibold text-[#1A1A1A] mt-2">
                                            {s.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-semibold ${s.tint}`}
                                    >
                                        {s.icon}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="font-[Fraunces] text-xl font-semibold text-[#1A1A1A] mb-4">
                                Recent Orders
                            </h2>
                            {recentOrders.length === 0 ? (
                                <p className="text-[#767676] text-sm py-8 text-center">
                                    No orders yet.
                                </p>
                            ) : (
                                <ul className="space-y-2">
                                    {recentOrders.map((order) => (
                                        <li
                                            key={order._id}
                                            className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-[#FAF7F2]"
                                        >
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="shrink-0 w-11 h-11 rounded-lg bg-white flex items-center justify-center font-[Fraunces] font-semibold text-[#8B2635]">
                                                    {order.tableNumber}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-[#1A1A1A]">
                                                        Table {order.tableNumber} · {order.items.length}{" "}
                                                        {order.items.length === 1 ? "item" : "items"}
                                                    </p>
                                                    <p className="text-xs text-[#767676]">
                                                        {new Date(order.createdAt).toLocaleString("en-IN", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            day: "numeric",
                                                            month: "short",
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 shrink-0">
                                                <span className="font-semibold text-[#1A1A1A]">
                                                    ₹{order.totalAmount}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[order.status]}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminOverview