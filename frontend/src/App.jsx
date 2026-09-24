import { Routes, Route } from "react-router-dom";
import CustomerApp from "./components/CustomerApp"
import KitchenDashboard from "./components/KitechenDashboard";
import AdminMenuManagement from "./components/AdminMenuManagement";
import AdminOrderManagement from "./components/AdminOrderManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerApp />} />
      <Route path="/kitchen" element={<KitchenDashboard />} />
      <Route path="/admin" element={<AdminMenuManagement />} />
      <Route path="/admin/orders" element={<AdminOrderManagement />} />
    </Routes>
  );
}

export default App;