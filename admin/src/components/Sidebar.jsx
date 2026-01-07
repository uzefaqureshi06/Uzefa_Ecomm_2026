import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Inbox,
  User,
  LogOut,
  Menu,
  UserCircle,
} from "lucide-react";
import { Profiler, useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-black border-b border-yellow-700 p-4">
        <h1 className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent font-bold">
          Admin Panel
        </h1>
        <Menu onClick={() => setOpen(!open)} className="text-yellow-500" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 
        bg-gradient-to-b from-black via-zinc-900 to-black 
        border-r border-yellow-700/50 shadow-[0_0_20px_rgba(234,179,8,0.15)]
        z-50 transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300`}
      >
        <h1
          className="text-2xl font-bold p-6 hidden md:block
          bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
          bg-clip-text text-transparent"
        >
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2 px-4">
          <Item to="/" icon={<Home size={18} />} label="Dashboard" />
          <Item
            to="/products"
            icon={<ShoppingCart size={18} />}
            label="Products"
          />
          <Item to="/customers" icon={<User size={18} />} label="Customers" />
          <Item to="/orders" icon={<Inbox size={18} />} label="Orders" />
          <Item
            to="/profile"
            icon={<UserCircle size={18} />}
            label={<span className="font-medium">Profile</span>}
          />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-xl
            border border-yellow-700 text-yellow-400
            hover:bg-gradient-to-r hover:from-yellow-500 hover:via-amber-500 hover:to-yellow-600
            hover:text-black transition-all duration-300 mt-4"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

function Item({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
        ${
          isActive
            ? "bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-black shadow-md"
            : "hover:bg-zinc-800 hover:text-yellow-400"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
