import { useState, useEffect } from "react"
import { updateOrderStatus, getOrderBill } from "../api/orderApi"
import { getAllPayments, updatePaymentStatus } from "../api/paymentApi"
import { FiRefreshCw } from "react-icons/fi"
import toast from "react-hot-toast"
import { useOrders } from "../hooks/useOrders"
import BillBreakdown from "./BillBreakdown"


const TABS = ["all", "pending", "preparing", "ready", "served"]
const statusStyles = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    preparing: "bg-blue-50 text-blue-700 ring-blue-200",
    ready: "bg-green-50 text-[#2D5F3E] ring-green-200",
    served: "bg-stone-100 text-stone-500 ring-stone-200",
}


const AdminOrderManagement = () => {
    const [activeTab, setActiveTab] = useState("all")
    const [bills, setBills] = useState({})
    const [payments, setPayments] = useState([])

    const { orders, setOrders, loading, error, refetch: fetchOrders } = useOrders(5000);
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await getAllPayments();
                setPayments(data);
            } catch (err) {
                toast.error("Failed to load payments");
            }
        };
        fetchPayments();
    }, []);

    const pendingPayments = payments.filter((p) => p.status === "pending");

    const handleConfirmPayment = async (id) => {
        try {
            const updated = await updatePaymentStatus(id, "completed");
            setPayments(payments.map((p) => p._id === id ? updated : p));
            toast.success("Payment confirmed");
        } catch (err) {
            toast.error("Failed to confirm payment");
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await updateOrderStatus(id, status)
            setOrders((prev) =>
                prev.map((o) => (o._id === id ? { ...o, status } : o))
            )
            toast.success(`Order marked as ${status}`);
        } catch (err) {
            toast.error("Failed to update status")
        }
    }

    const handleToggleBill = async (id) => {
        if (bills[id]) {
            setBills((prev) => {
                const copy = { ...prev }
                delete copy[id]
                return copy
            })
            return
        }
        try {
            const bill = await getOrderBill(id)
            setBills((prev) => ({ ...prev, [id]: bill }))
        } catch (err) {
            toast.error("Failed to load bill")
        }
    }
    const filtered =
        activeTab === "all"
            ? orders
            : orders.filter((o) => o.status === activeTab)

    const countFor = (tab) =>
        tab === "all" ? orders.length : orders.filter((o) => o.status === tab).length

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            {pendingPayments.length > 0 && (
                <div className="mb-6">
                    <h2 className="font-[Poppins] font-bold text-lg text-[#1A1A1A] mb-3">
                        Pending Payment Confirmations
                    </h2>
                    <div className="space-y-2">
                        {pendingPayments.map((payment) => (
                            <div key={payment._id} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border-l-4 border-amber-500">
                                <div>
                                    <p className="font-[Poppins] font-semibold text-[#1A1A1A]">
                                        Table {payment.orderId?.tableNumber} — ₹{payment.amount}
                                    </p>
                                    <p className="font-[Poppins] text-xs text-[#767676] capitalize">
                                        {payment.paymentMethod}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleConfirmPayment(payment._id)}
                                    className="font-[Poppins] font-bold bg-[#2D5F3E] hover:bg-[#244c32] text-white px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
                                >
                                    Confirm Received
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                    Orders
                </h1>
                <button
                    onClick={fetchOrders}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-[Poppins] font-semibold rounded-xl bg-[#2D5F3E] text-white hover:bg-[#244c32] cursor-pointer transition-colors"
                >
                    <FiRefreshCw size={15} />
                    Refresh
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`font-[Poppins] font-semibold shrink-0 px-4 py-2 rounded-full text-sm capitalize border cursor-pointer transition-colors ${activeTab === tab
                            ? "bg-[#2D5F3E] border-[#2D5F3E] text-white"
                            : "bg-white border-stone-300 text-[#1A1A1A] hover:bg-stone-50"
                            }`}
                    >
                        {tab} ({countFor(tab)})
                    </button>
                ))}
            </div>

            {loading && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col gap-3 shadow-sm animate-pulse">
                            <div className="flex justify-between items-start">
                                <div className="h-5 w-24 bg-stone-200 rounded" />
                                <div className="h-5 w-16 bg-stone-200 rounded-full" />
                            </div>
                            <div className="space-y-2 py-1">
                                <div className="h-3 bg-stone-200 rounded w-full" />
                                <div className="h-3 bg-stone-200 rounded w-2/3" />
                            </div>
                            <div className="h-4 bg-stone-200 rounded w-1/3" />
                            <div className="flex gap-2">
                                <div className="h-9 flex-1 bg-stone-200 rounded-xl" />
                                <div className="h-9 w-20 bg-stone-200 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {error && !loading && (
                <p className="font-[Poppins] text-[#8B2635] bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
                    {error}
                </p>
            )}
            {!loading && !error && filtered.length === 0 && (
                <p className="font-[Poppins] text-center text-[#767676] py-12">
                    No {activeTab === "all" ? "" : activeTab} orders here.
                </p>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {filtered.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col gap-3 shadow-sm"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-[Poppins] font-bold text-lg text-[#1A1A1A]">
                                        Table {order.tableNumber}
                                    </p>
                                    <p className="font-[Poppins] text-xs text-[#767676]">
                                        {new Date(order.createdAt).toLocaleString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            day: "numeric",
                                            month: "short",
                                        })}
                                    </p>
                                </div>
                                <span
                                    className={`font-[Poppins] px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ring-inset ${statusStyles[order.status]}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <ul className="divide-y divide-stone-100 text-sm">
                                {order.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="font-[Poppins] flex justify-between gap-3 py-1.5 text-[#1A1A1A]"
                                    >
                                        <span className="min-w-0 truncate">
                                            <span className="text-[#2D5F3E] font-semibold">
                                                {item.quantity}×
                                            </span>{" "}
                                            {item.menuItem?.name ?? "Deleted item"}
                                        </span>
                                        <span className="shrink-0 text-[#767676]">
                                            ₹{item.price * item.quantity}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex justify-between items-center border-t border-stone-200 pt-3">
                                <span className="font-[Poppins] text-sm text-[#767676]">Total</span>
                                <span className="font-[Poppins] font-bold text-[#1A1A1A]">
                                    ₹{order.totalAmount}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(order._id, e.target.value)
                                    }
                                    className="font-[Poppins] flex-1 min-w-0 px-2 py-2 text-sm capitalize rounded-xl border border-stone-300 bg-white text-[#1A1A1A] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                                >
                                    {TABS.filter((t) => t !== "all").map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleToggleBill(order._id)}
                                    className={`font-[Poppins] font-semibold shrink-0 px-4 py-2 text-sm rounded-xl border cursor-pointer transition-colors ${bills[order._id]
                                        ? "bg-white border-[#2D5F3E] text-[#2D5F3E]"
                                        : "bg-[#2D5F3E] border-[#2D5F3E] text-white hover:bg-[#244c32]"
                                        }`}
                                >
                                    {bills[order._id] ? "Hide Bill" : "View Bill"}
                                </button>
                            </div>

                            {bills[order._id] && <BillBreakdown bill={bills[order._id]} />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminOrderManagement