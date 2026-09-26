import { useState, useEffect } from "react"
import { getAllWaiterCalls, resolveWaiterCall } from "../api/waiterApi"
import { getAllTables } from "../api/tableApi"
import { getAllOrders } from "../api/orderApi"

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

    console.log("tables data:", tables);

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
        <div className="min-h-screen bg-[#FAF7F2] p-6">
            <h1 className="font-[Fraunces] text-2xl font-semibold text-[#1A1A1A] mb-6">Waiter Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-lg font-medium text-[#1A1A1A] mb-3">Waiter Calls</h2>
                {pendingCalls.length === 0 ? (
                    <p className="text-[#767676] text-sm">No pending calls.</p>
                ) : (
                    <div className="space-y-3">
                        {pendingCalls.map((call) => (
                            <div key={call._id} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border-l-4 border-amber-500">
                                <div>
                                    <p className="font-[Fraunces] text-lg font-semibold text-[#1A1A1A]">Table {call.tableNumber} is requesting a waiter</p>
                                    <p className="text-xs text-[#767676]">{new Date(call.createdAt).toLocaleTimeString()}</p>
                                </div>
                                <button onClick={() => handleResolve(call._id)} className="bg-[#2D5F3E] text-white px-4 py-2 rounded-full text-sm font-medium">
                                    Resolve
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section className="mb-8">
                <h2 className="text-lg font-medium text-[#1A1A1A] mb-3">Tables</h2>
                <div className="grid grid-cols-4 gap-3">
                    {tables.map((table) => (
                        <div key={table._id} className="bg-white rounded-xl p-3 shadow-sm text-center">
                            <p className="font-[Fraunces] text-xl font-bold text-[#1A1A1A]">{table.tableNumber}</p>
                            <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${table.status === "available" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                                {table.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-lg font-medium text-[#1A1A1A] mb-3">Active Orders</h2>
                {activeOrders.length === 0 ? (
                    <p className="text-[#767676] text-sm">No active orders.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {activeOrders.map((order) => (
                            <div key={order._id} className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-medium text-[#1A1A1A]">Table {order.tableNumber}</p>
                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">{order.status}</span>
                                </div>
                                <p className="text-sm text-[#767676]">{order.items.length} items • ₹{order.totalAmount}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default WaiterDashboard