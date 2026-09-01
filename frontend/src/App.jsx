import getMenu from "./api/menuApi";
import { useState, useEffect } from "react";


function App() {
  const [menuItems, setMenuItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu()
      console.log(data);
      
      setMenuItems(data)
    };
    fetchData()
  }, [])
  return (
    <>
      <h1>hello</h1>
    </>
  )

}

export default App
