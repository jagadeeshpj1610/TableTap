import { useState, useEffect } from "react"
import { getAllOrders, updateOrderStatus, getOrderBill } from "../api/orderApi"
import { getAllPayments, updatePaymentStatus } from "../api/paymentApi"

const TABS = ["all", "pending", "preparing", "ready", "served"]

const statusStyles = {
    pending: "bg-amber-50 text-amber-700 ring-amber-200",
    preparing: "bg-blue-50 text-blue-700 ring-blue-200",
    ready: "bg-green-50 text-[#2D5F3E] ring-green-200",
    served: "bg-stone-100 text-stone-500 ring-stone-200",
}

const AdminOrderManagement = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState("all")
    const [bills, setBills] = useState({})
    const [payments, setPayments] = useState([])


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


    useEffect(() => {
        const fetchPayments = async () => {
            const data = await getAllPayments();
            setPayments(data);
        };
        fetchPayments();
    }, []);

    const pendingPayments = payments.filter((p) => p.status === "pending");

    const handleConfirmPayment = async (id) => {
        const updated = await updatePaymentStatus(id, "completed");
        setPayments(payments.map((p) => p._id === id ? updated : p));
    };

    const handleStatusChange = async (id, status) => {
        try {
            await updateOrderStatus(id, status)
            setOrders((prev) =>
                prev.map((o) => (o._id === id ? { ...o, status } : o))
            )
        } catch (err) {
            alert("Failed to update status")
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
            alert("Failed to load bill")
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
                    <h2 className="text-lg font-medium text-[#1A1A1A] mb-3">Pending Payment Confirmations</h2>
                    <div className="space-y-2">
                        {pendingPayments.map((payment) => (
                            <div key={payment._id} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border-l-4 border-amber-500">
                                <div>
                                    <p className="font-medium text-[#1A1A1A]">Table {payment.orderId?.tableNumber} — ₹{payment.amount}</p>
                                    <p className="text-xs text-[#767676] capitalize">{payment.paymentMethod}</p>
                                </div>
                                <button onClick={() => handleConfirmPayment(payment._id)} className="bg-[#2D5F3E] text-white px-4 py-2 rounded-full text-sm font-medium">
                                    Confirm Received
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between mb-4">
                <h1 className="font-[Fraunces] text-2xl font-semibold text-[#1A1A1A]">
                    Orders
                </h1>
                <button
                    onClick={fetchOrders}
                    className="px-3 py-1.5 text-sm rounded-lg border border-stone-300 bg-white text-[#1A1A1A] hover:bg-stone-50"
                >
                    Refresh
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`shrink-0 px-4 py-1.5 rounded-full text-sm capitalize border ${activeTab === tab
                            ? "bg-[#8B2635] border-[#8B2635] text-white"
                            : "bg-white border-stone-300 text-[#1A1A1A] hover:bg-stone-50"
                            }`}
                    >
                        {tab} ({countFor(tab)})
                    </button>
                ))}
            </div>

            {loading && <p className="text-[#767676]">Loading orders...</p>}
            {error && !loading && (
                <p className="text-[#8B2635] bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
                    {error}
                </p>
            )}
            {!loading && !error && filtered.length === 0 && (
                <p className="text-center text-[#767676] py-12">
                    No {activeTab === "all" ? "" : activeTab} orders here.
                </p>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
                    {filtered.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-[Fraunces] text-lg font-semibold text-[#1A1A1A]">
                                        Table {order.tableNumber}
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
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ring-1 ring-inset ${statusStyles[order.status]}`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            <ul className="divide-y divide-stone-100 text-sm">
                                {order.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between gap-3 py-1.5 text-[#1A1A1A]"
                                    >
                                        <span className="min-w-0 truncate">
                                            <span className="text-[#8B2635] font-medium">
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
                                <span className="text-sm text-[#767676]">Total</span>
                                <span className="font-semibold text-[#1A1A1A]">
                                    ₹{order.totalAmount}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(order._id, e.target.value)
                                    }
                                    className="flex-1 min-w-0 px-2 py-2 text-sm capitalize rounded-lg border border-stone-300 bg-white text-[#1A1A1A]"
                                >
                                    {TABS.filter((t) => t !== "all").map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleToggleBill(order._id)}
                                    className={`shrink-0 px-4 py-2 text-sm rounded-lg border ${bills[order._id]
                                        ? "bg-white border-[#2D5F3E] text-[#2D5F3E]"
                                        : "bg-[#2D5F3E] border-[#2D5F3E] text-white hover:bg-[#244c32]"
                                        }`}
                                >
                                    {bills[order._id] ? "Hide Bill" : "View Bill"}
                                </button>
                            </div>

                            {bills[order._id] && (
                                <div className="bg-[#FAF7F2] rounded-lg p-3 text-sm space-y-1.5">
                                    <div className="flex justify-between text-[#767676]">
                                        <span>Subtotal</span>
                                        <span>₹{bills[order._id].subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-[#767676]">
                                        <span>Tax (5%)</span>
                                        <span>₹{bills[order._id].tax}</span>
                                    </div>
                                    <div className="flex justify-between text-[#767676]">
                                        <span>Service (10%)</span>
                                        <span>₹{bills[order._id].serviceCharge}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-[#1A1A1A] border-t border-stone-200 pt-1.5">
                                        <span>Grand Total</span>
                                        <span>₹{bills[order._id].total}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminOrderManagement