import { useState, useEffect } from "react"
import { getMenu, createMenuItem, updateMenuItem, deleteMenuItem } from "../api/menuApi";
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import toast from "react-hot-toast";

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

    const CATEGORIES = ["Starters", "Main Course", "Biryani", "Snacks", "Drinks", "Desserts"];

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMenu()
                setMenuItems(data)
            } catch (err) {
                toast.error("Failed to load menu")
            } finally {
                setLoading(false)
            }
        };
        fetchData()
    }, [])

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error("Please enter a name");
            return false;
        }
        if (!formData.price || Number(formData.price) <= 0) {
            toast.error("Please enter a valid price");
            return false;
        }
        if (!formData.category) {
            toast.error("Please select a category");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            if (editingId) {
                const updatedItem = await updateMenuItem(editingId, formData);
                setMenuItems(menuItems.map((item) => item._id === editingId ? updatedItem : item));
                setEditingId(null);
                toast.success("Menu item updated successfully!");
            } else {
                const newItem = await createMenuItem(formData);
                setMenuItems([...menuItems, newItem]);
                toast.success("Menu item added successfully!");
            }
            setFormData({ name: "", price: "", category: "", description: "", isAvailable: true, isVeg: true, imageUrl: "" });
        } catch (err) {
            toast.error(editingId ? "Failed to update item" : "Failed to add item");
        }
    };

    const handleToggleAvailability = async (item) => {
        try {
            const updatedItem = await updateMenuItem(item._id, { ...item, isAvailable: !item.isAvailable })
            setMenuItems(menuItems.map((menuItem =>
                menuItem._id === item._id ? updatedItem : menuItem
            )))
            toast.success(updatedItem.isAvailable ? "Marked as available" : "Marked as unavailable");
        } catch (err) {
            toast.error("Failed to update availability");
        }
    }

    const handleDeleteItem = async (id) => {
        try {
            await deleteMenuItem(id);
            setMenuItems(menuItems.filter((item) => item._id !== id))
            toast.success("Item deleted");
        } catch (err) {
            toast.error("Failed to delete item");
        }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="mb-8">
                <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                    Menu Management
                </h1>
                <p className="font-[Poppins] text-sm text-[#767676] mt-1">
                    Add, edit, and manage availability of menu items
                </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 mb-8 shadow-sm max-w-2xl">
                <h2 className="font-[Poppins] font-bold text-lg text-[#1A1A1A] mb-4">
                    {editingId ? "Edit Item" : "Add New Item"}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="font-[Poppins] border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="font-[Poppins] border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                    />
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="font-[Poppins] border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                    >
                        <option value="" disabled>Select category</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                        className="font-[Poppins] border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="font-[Poppins] border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] col-span-2 focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                    />
                    <label className="flex items-center gap-2 font-[Poppins] text-sm text-[#1A1A1A] col-span-2">
                        <input
                            type="checkbox"
                            checked={formData.isVeg}
                            onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                            className="accent-[#2D5F3E]"
                        /> Veg
                    </label>
                </div>
                <button
                    onClick={handleSubmit}
                    className="font-[Poppins] font-bold bg-[#2D5F3E] hover:bg-[#244c32] text-white px-5 py-2.5 rounded-full text-sm cursor-pointer transition-colors"
                >
                    {editingId ? "Update Item" : "Add Item"}
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 animate-pulse">
                            <div className="flex justify-between items-start mb-2 gap-2">
                                <div className="h-5 bg-stone-200 rounded w-2/3" />
                                <div className="h-5 bg-stone-200 rounded-full w-20" />
                            </div>
                            <div className="h-4 bg-stone-200 rounded w-1/2 mb-3" />
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-stone-200 rounded-full" />
                                <div className="h-8 w-8 bg-stone-200 rounded-full" />
                                <div className="h-8 w-8 bg-stone-200 rounded-full ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col gap-3"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-[Poppins] font-bold text-[#1A1A1A]">{item.name}</h3>
                                <span
                                    className={`font-[Poppins] shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${item.isAvailable
                                        ? "bg-green-50 text-[#2D5F3E] ring-green-200"
                                        : "bg-red-50 text-red-700 ring-red-200"
                                        }`}
                                >
                                    {item.isAvailable ? "Available" : "Unavailable"}
                                </span>
                            </div>
                            <p className="font-[Poppins] text-sm text-[#767676]">
                                {item.category} · ₹{item.price}
                            </p>
                            <div className="flex gap-2 mt-1">
                                <button
                                    onClick={() => handleEditClick(item)}
                                    className="font-[Poppins] font-semibold flex items-center gap-1.5 text-xs border border-stone-300 text-[#1A1A1A] px-3 py-1.5 rounded-full cursor-pointer hover:bg-stone-50 transition-colors"
                                >
                                    <FiEdit2 size={12} /> Edit
                                </button>
                                <button
                                    onClick={() => handleToggleAvailability(item)}
                                    className="font-[Poppins] font-semibold text-xs border border-stone-300 text-[#1A1A1A] px-3 py-1.5 rounded-full cursor-pointer hover:bg-stone-50 transition-colors"
                                >
                                    {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item._id)}
                                    className="font-[Poppins] font-semibold flex items-center gap-1.5 text-xs border border-red-300 text-[#8B2635] px-3 py-1.5 rounded-full cursor-pointer hover:bg-red-50 transition-colors"
                                >
                                    <FiTrash2 size={12} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminMenuManagement