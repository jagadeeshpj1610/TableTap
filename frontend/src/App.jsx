import getMenu from "./api/menuApi";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import FoodCard from './components/FoodCard'
import CategoryTabs from "./components/CategoryTabs";


function App() {
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu()
      setMenuItems(data)
    };
    fetchData()
  }, [])
  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);
  return (
    <>
      <Header />
      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 p-3">

        {filteredItems.map((item) => (
          <FoodCard
            key={item._id}
            image={item.imageUrl}
            name={item.name}
            description={item.description}
            price={item.price}
            isVeg={item.isVeg}
            onAdd={() => console.log("added", item.name)}
          />
        ))}
      </div>

    </>
  )
}
export default App;
