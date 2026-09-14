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

    console.log(orders);

    return (
        <></>
    )
}

export default KitchenDashboard