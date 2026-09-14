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

    const handleSubmit = async () => {
        if (editingId) {
            const updatedItem = await updateMenuItem(editingId, formData);
            setMenuItems(menuItems.map((item) => item._id === editingId ? updatedItem : item));
            setEditingId(null);
        } else {
            const newItem = await createMenuItem(formData);
            setMenuItems([...menuItems, newItem]);
        }
        setFormData({ name: "", price: "", category: "", description: "", isAvailable: true, isVeg: true, imageUrl: "" });
    };

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
        <div className="min-h-screen bg-[#FAF7F2] p-6">
            <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">Menu Management</h1>

            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm max-w-2xl">
                <h2 className="font-medium text-lg text-[#1A1A1A] mb-4">{editingId ? "Edit Item" : "Add New Item"}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="border border-neutral-200 rounded-lg px-3 py-2 text-sm col-span-2"
                    />
                    <label className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                        <input
                            type="checkbox"
                            checked={formData.isVeg}
                            onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                        /> Veg
                    </label>
                </div>
                <button onClick={handleSubmit} className="bg-[#8B2635] text-white px-5 py-2 rounded-full text-sm font-medium">
                    {editingId ? "Update Item" : "Add Item"}
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {menuItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-serif font-bold text-[#1A1A1A]">{item.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {item.isAvailable ? "Available" : "Unavailable"}
                            </span>
                        </div>
                        <p className="text-sm text-[#767676] mb-1">{item.category} • ₹{item.price}</p>
                        <div className="flex gap-2 mt-3">
                            <button onClick={() => handleEditClick(item)} className="text-xs border border-neutral-300 px-3 py-1.5 rounded-full">Edit</button>
                            <button onClick={() => handleToggleAvailability(item)} className="text-xs border border-neutral-300 px-3 py-1.5 rounded-full">
                                {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                            </button>
                            <button onClick={() => handleDeleteItem(item._id)} className="text-xs border border-red-300 text-red-600 px-3 py-1.5 rounded-full">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminMenuManagement