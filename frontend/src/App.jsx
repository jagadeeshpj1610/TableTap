import getMenu from "./api/menuApi";
import { useState, useEffect } from "react";


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
    <>
      <h1 className="text-3xl font-bold text-red-600">hello</h1>
    </>
  )

}

export default App
