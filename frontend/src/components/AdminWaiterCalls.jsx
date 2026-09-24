import { useState, useEffect } from "react"
import { getAllWaiterCalls, resolveWaiterCall } from "../api/waiterApi"

const AdminWaiterCalls = () => {
    const [calls, setCalls] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllWaiterCalls()
            setCalls(data)
        };
        fetchData()
    }, [])

    return (
        <div>
            {calls.map((call) => (
                <div key={call._id}>
                    <p>Table {call.tableNumber}</p>
                    <p>{call.status}</p>
                </div>
            ))}
        </div>
    )
}

export default AdminWaiterCalls