import { useState, useEffect } from "react"
import getMenu from "../api/menuApi"

const AdminMenuManagement = () => {
    const [menuItems, setMenuItems] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        isAvailable: true,
        isVeg: true,
        imageUrl: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMenu()
            setMenuItems(data)
        };
        fetchData()
    }, [])

    return (
        <div>
            {menuItems.map((item) => (
                <div key={item._id}>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{item.category}</p>
                    <p>{item.isAvailable ? "Available" : "Unavailable"}</p>
                </div>
            ))}
        </div>
    )
}

export default AdminMenuManagement