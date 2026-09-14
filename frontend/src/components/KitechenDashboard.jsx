import { useState, useEffect } from "react"
import { getAllOrders, updateOrderStatus } from "../api/orderApi"

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOrders()
            setOrders(data)
        };
        fetchData()
    }, [])

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        const updatedOrder = await updateOrderStatus(orderId, newStatus);
        setOrders(orders.map((order) => order._id === orderId ? updatedOrder : order))
    }

    const statusStyles = {
        pending: { border: "border-amber-500", button: "bg-amber-500/10 text-amber-400 border border-amber-500/30", label: "Accept Order", next: "preparing" },
        preparing: { border: "border-blue-500", button: "bg-blue-500/10 text-blue-400 border border-blue-500/30", label: "Mark Ready", next: "ready" },
        ready: { border: "border-green-500", button: "bg-green-500/10 text-green-400 border border-green-500/30", label: "Served", next: "served" },
    };
    const activeOrders = orders.filter((order) => order.status !== "served");

    return (
        <div className="min-h-screen bg-[#111417] p-6">
            <h1 className="text-white text-2xl font-medium mb-6">Kitchen Orders</h1>
            <div className="grid grid-cols-3 gap-4">
                {activeOrders.map((order) => {
                    const style = statusStyles[order.status] || statusStyles.pending;
                    return (
                        <div key={order._id} className={`bg-[#1B1F24] rounded-2xl p-5 border-l-4 ${style.border} min-h-[220px] flex flex-col`}>
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-medium text-lg text-white">Table {order.tableNumber}</span>
                                <span className="text-xs text-neutral-500">{new Date(order.createdAt).toLocaleTimeString()}</span>
                            </div>

                            <div className="flex-1">
                                {order.items.map((item) => (
                                    <p key={item._id} className="text-[15px] text-neutral-300 mb-1.5 leading-relaxed">
                                        {item.menuItem ? item.menuItem.name : "Item unavailable"}
                                        <span className="text-white font-medium"> ×{item.quantity}</span>
                                    </p>
                                ))}
                            </div>

                            <button onClick={() => handleUpdateOrderStatus(order._id, style.next)} className={`w-full mt-4 py-2.5 rounded-lg text-sm font-medium ${style.button}`}>
                                {style.label}
                            </button>
                        </div>
                    )

                })}

            </div>
        </div>
    )
}

export default KitchenDashboard