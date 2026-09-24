import { useState, useEffect } from "react"
import { getAllOrders, updateOrderStatus, getOrderBill } from "../api/orderApi"

const TABS = ["all", "pending", "preparing", "ready", "served"]

const AdminOrderManagement = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState("all")
    const [bills, setBills] = useState({})

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
        <div>
            <div>
                <h1>Orders</h1>
                <button onClick={fetchOrders}>Refresh</button>
            </div>

            <div>
                {TABS.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}>
                        {tab} ({countFor(tab)})
                    </button>
                ))}
            </div>

            {loading && <p>Loading orders...</p>}
            {error && !loading && <p>{error}</p>}
            {!loading && !error && filtered.length === 0 && (
                <p>No {activeTab === "all" ? "" : activeTab} orders here.</p>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div>
                    {filtered.map((order) => (
                        <div key={order._id}>
                            <div>
                                <p>Table {order.tableNumber}</p>
                                <p>
                                    {new Date(order.createdAt).toLocaleString("en-IN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        day: "numeric",
                                        month: "short",
                                    })}
                                </p>
                                <p>{order.status}</p>
                            </div>

                            <ul>
                                {order.items.map((item, i) => (
                                    <li key={i}>
                                        {item.quantity} × {item.menuItem?.name ?? "Deleted item"} — ₹{item.price * item.quantity}
                                    </li>
                                ))}
                            </ul>

                            <p>Total: ₹{order.totalAmount}</p>

                            <div>
                                <select
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(order._id, e.target.value)
                                    }
                                >
                                    {TABS.filter((t) => t !== "all").map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={() => handleToggleBill(order._id)}>
                                    {bills[order._id] ? "Hide Bill" : "View Bill"}
                                </button>
                            </div>

                            {bills[order._id] && (
                                <div>
                                    <p>Subtotal: ₹{bills[order._id].subtotal}</p>
                                    <p>Tax (5%): ₹{bills[order._id].tax}</p>
                                    <p>Service (10%): ₹{bills[order._id].serviceCharge}</p>
                                    <p>Grand Total: ₹{bills[order._id].total}</p>
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