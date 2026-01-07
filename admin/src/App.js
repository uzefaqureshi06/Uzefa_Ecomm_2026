import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import AddForm from "./pages/AddForm";
import Profile from "./pages/Profile";
import EditProduct from "./pages/EditProduct";
import Auth from "./pages/Auth";

export default function App() {
  const location = useLocation();

  // Hide sidebar on /auth route
  const hideSidebar = location.pathname.startsWith("/auth");

  return (
    <div className="flex h-screen bg-black text-gray-200">
      {/* Sidebar */}
      {!hideSidebar && <Sidebar />}

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto ${
          hideSidebar ? "p-0" : "p-4 md:p-6"
        }`}
      >
        <Routes>
          {/* Auth */}
          <Route path="/auth" element={<Auth />} />

          {/* Dashboard Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddForm />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </div>
  );
}
