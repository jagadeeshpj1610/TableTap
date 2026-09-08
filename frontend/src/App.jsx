import getMenu from "./api/menuApi";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import FoodCard from './components/FoodCard'
import CategoryTabs from "./components/CategoryTabs";
import SearchBar from "./components/SearchBar";


function App() {
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu()
      setMenuItems(data)
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
  }
  console.log(cartItems);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <>
      <Header cartCount = {totalCartItems} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 px-6 py-4">
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

    </>
  )
}
export default App;
