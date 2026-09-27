import { getMenu } from "../api/menuApi";
import { useState, useEffect } from "react";
import Header from "./Header";
import FoodCard from './FoodCard'
import CategoryTabs from "./CategoryTabs";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import { createOrder, getOrderBill } from "../api/orderApi"
import OrderTracking from "./OrderTracking";
import { createWaiterCall } from "../api/waiterApi";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi"
import toast from "react-hot-toast"



function CustomerApp() {
    const [menuItems, setMenuItems] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchTerm, setSearchTerm] = useState("")
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [bill, setBill] = useState(null);
    const [menuLoading, setMenuLoading] = useState(true)


    const [searchParams] = useSearchParams();
    const tableNumber = searchParams.get("table") || "1";


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMenu()
                setMenuItems(data)
            } catch (err) {
                toast.error("Failed to load menu")
            } finally {
                setMenuLoading(false)
            }
        };
        fetchData()
    }, [])
    const filteredItems = menuItems.filter((item) => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addToCart = (item) => {
        const existingItem = cartItems.find((cardItem) => cardItem.menuItem === item._id)
        if (existingItem) {
            setCartItems(cartItems.map((cartItem) =>
                cartItem.menuItem === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCartItems([...cartItems, { menuItem: item._id, name: item.name, price: item.price, quantity: 1 }]);
        }
        toast.success(`${item.name} added to cart`);
    }

    const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const updateQuantity = (menuItemId, change) => {
        setCartItems(
            cartItems
                .map((cartItem) =>
                    cartItem.menuItem === menuItemId
                        ? { ...cartItem, quantity: cartItem.quantity + change }
                        : cartItem
                )
                .filter((cartItem) => cartItem.quantity > 0)
        );
    };

    const placeOrder = async () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }
        const orderItems = cartItems.map((item) => ({
            menuItem: item.menuItem,
            quantity: item.quantity,
            price: item.price
        }));

        try {
            const data = await createOrder(tableNumber, orderItems);
            setCurrentOrder(data)
            setCartItems([])
            setIsCartOpen(false)
            toast.success("Order placed!");
        } catch (err) {
            toast.error("Failed to place order. Please try again.");
        }
    };

    const callWaiter = async () => {
        try {
            await createWaiterCall(tableNumber);
            toast.success("Waiter has been notified");
        } catch (err) {
            toast.error("Failed to call waiter");
        }
    };
    const viewBill = async () => {
        try {
            const billData = await getOrderBill(currentOrder._id);
            setBill(billData);
        } catch (err) {
            toast.error("Failed to load bill");
        }
    };
    return (
        <>
            {currentOrder && <OrderTracking currentOrder={currentOrder} onClose={() => setCurrentOrder(null)} callWaiter={callWaiter} viewBill={viewBill} bill={bill} />}

            {isCartOpen && (
                <Cart cartItems={cartItems} updateQuantity={updateQuantity} onClose={() => setIsCartOpen(false)} placeOrder={placeOrder} />
            )}

            <Header cartCount={totalCartItems} onCartClick={() => setIsCartOpen(true)} tableNumber={tableNumber} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {menuLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 py-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-100 animate-pulse">
                            <div className="aspect-[16/10] w-full bg-stone-200" />
                            <div className="p-2.5 sm:p-3 flex flex-col gap-2">
                                <div className="h-4 bg-stone-200 rounded w-3/4" />
                                <div className="h-3 bg-stone-200 rounded w-full" />
                                <div className="h-5 bg-stone-200 rounded w-1/3 mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center px-6 py-16">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                        <FiSearch className="text-neutral-400" size={28} />
                    </div>
                    <h3 className="font-[Poppins] font-semibold text-lg text-[#1A1A1A] mb-1">
                        {searchTerm ? "No dishes found" : "Nothing here yet"}
                    </h3>
                    <p className="font-[Poppins] text-sm text-[#767676] max-w-xs">
                        {searchTerm
                            ? `We couldn't find anything matching "${searchTerm}".`
                            : `No items available in ${selectedCategory} right now.`}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 py-4">
                    {filteredItems.map((item) => (
                        <FoodCard
                            key={item._id}
                            image={item.imageUrl}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            isVeg={item.isVeg}
                            onAdd={() => addToCart(item)}
                        />
                    ))}
                </div>
            )}
        </>
    )
}
export default CustomerApp;
