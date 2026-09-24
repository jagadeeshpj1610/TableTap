import { Routes, Route } from "react-router-dom";
import CustomerApp from "./components/CustomerApp"
import KitchenDashboard from "./components/KitechenDashboard";
import AdminMenuManagement from "./components/AdminMenuManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerApp />} />
      <Route path="/kitchen" element={<KitchenDashboard />} />
      <Route path="/admin" element={<AdminMenuManagement />} />
    </Routes>
  );
}

export default App;