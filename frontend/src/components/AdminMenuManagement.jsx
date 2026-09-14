import { useState, useEffect } from "react"
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../api/menuApi";


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
    const [editingId, setEditingId] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMenu()
            setMenuItems(data)
        };
        fetchData()
    }, [])

    const handleAddItem = async () => {
        const newItem = await createMenuItem(formData)
        setMenuItems([...menuItems, newItem])
        setFormData({ name: "", price: "", category: "", description: "", isAvailable: true, isVeg: true, imageUrl: "" })
    }

    const handleToggleAvailability = async (item) => {
        const updatedItem = await updateMenuItem(item._id, { ...item, isAvailable: !item.isAvailable })
        setMenuItems(menuItems.map((menuItem =>
            menuItem._id === item._id ? updatedItem : menuItem
        )))
    }

    const handleDeleteItem = async (id) => {
        const deletedItem = await deleteMenuItem(id);
        setMenuItems(menuItems.filter((item) => item._id !== id))
    }

    const handleEditClick = (item) => {
        setFormData({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description,
            isAvailable: item.isAvailable,
            isVeg: item.isVeg,
            imageUrl: item.imageUrl
        });
        setEditingId(item._id);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
            <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <label>
                <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                /> Veg
            </label>
            <button onClick={handleAddItem}>Add Item</button>
            <div>
                {menuItems.map((item) => (
                    <div key={item._id}>
                        <p>{item.name} — ₹{item.price}</p>
                        <p>{item.category}</p>
                        <p>{item.isAvailable ? "Available" : "Unavailable"}</p>
                        <button onClick={() => handleToggleAvailability(item)}>
                            {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                        </button>
                        <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminMenuManagement