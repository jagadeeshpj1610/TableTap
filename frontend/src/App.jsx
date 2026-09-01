import getMenu from "./api/menuApi";
import { useState, useEffect } from "react";
import FoodCard from './components/FoodCard'


function App() {
  const [menuItems, setMenuItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu()
      setMenuItems(data)
    };
    fetchData()
  }, [])
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 p-3">
      {menuItems.map((item) => (
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
  )
}
export default App;
