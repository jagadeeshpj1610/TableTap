import { Routes, Route, Navigate } from "react-router-dom";
import CustomerApp from "./components/CustomerApp"
import KitchenDashboard from "./components/KitechenDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminMenuManagement from "./components/AdminMenuManagement";
import AdminOrderManagement from "./components/AdminOrderManagement";
import AdminOverview from "./components/AdminOveriew";
import AdminWaiterCalls from "./components/AdminWaiterCalls";
import AdminTableManagement from "./components/AdminTableManagement";


function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerApp />} />
      <Route path="/kitchen" element={<KitchenDashboard />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="orders" element={<AdminOrderManagement />} />
        <Route path="menu" element={<AdminMenuManagement />} />
        <Route path="waiter-calls" element={<AdminWaiterCalls />} />
        <Route path="tableManagement" element={<AdminTableManagement />} />
      </Route>
    </Routes>
  );
}

export default App;