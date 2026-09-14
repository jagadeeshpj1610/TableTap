import { useState, useEffect } from "react"
import { getAllOrders } from "../api/orderApi"

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllOrders()
            setOrders(data)
        };
        fetchData()
    }, [])
    return (
        <div>
            {orders.map((order) => (
                <div key={order._id}>
                    <h3>Table : {order.tableNumber}</h3>
                    <p>Status : {order.status}</p>
                    {order.items.map((item) => (
                       <p key={item._id}>{item.menuItem ? item.menuItem.name : "Item unavailable"} x {item.quantity}</p>
                    ))}
                    <p>{order.specialInstructions}</p>
                </div>
            ))}
        </div>
    )
}

export default KitchenDashboard