import { useState, useEffect } from "react"
import getMenu from "../api/menuApi"

const KitechenDashboard = () => {
    const [menuItems, setMenuItems] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMenu()
            setMenuItems(data)
        };
        fetchData()
    }, [])
    return (
        <></>
    )
}

export default KitechenDashboard