import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { FiHome, FiClipboard, FiBook, FiBell, FiGrid, FiLogOut } from "react-icons/fi"
import { logout } from "../utils/auth"
import { useState } from "react"
import ConfirmLogoutModal from "./ConfirmLogoutModal"

const links = [
    { to: "/admin/overview", label: "Overview", icon: FiHome },
    { to: "/admin/orders", label: "Orders", icon: FiClipboard },
    { to: "/admin/menu", label: "Menu", icon: FiBook },
    { to: "/admin/waiter-calls", label: "Waiter Calls", icon: FiBell },
    { to: "/admin/tableManagement", label: "Tables & QR", icon: FiGrid },
]

const AdminLayout = () => {

    const navigate = useNavigate();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row">
            <aside className="bg-white border-b md:border-b-0 md:border-r border-stone-200 md:w-64 md:min-h-screen md:sticky md:top-0 md:self-start shrink-0">
                <div className="px-5 py-5 md:py-6 border-b border-stone-100 md:border-none">
                    <h2 className="font-[Poppins] font-extrabold text-xl text-[#1A1A1A] tracking-tight">
                        TableTap
                    </h2>
                    <p className="font-[Poppins] text-xs font-medium text-[#767676] mt-0.5">
                        Admin Dashboard
                    </p>
                </div>

                <nav className="flex md:flex-col gap-1 overflow-x-auto px-3 py-3 md:py-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-2.5 shrink-0 px-4 py-2.5 rounded-xl text-sm font-[Poppins] font-semibold whitespace-nowrap transition-colors ${isActive
                                        ? "bg-[#2D5F3E] text-white"
                                        : "text-[#1A1A1A] hover:bg-[#FAF7F2]"
                                    }`
                                }
                            >
                                <Icon size={17} className="shrink-0" />
                                {link.label}
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="mt-auto px-3 pb-4 md:pb-6 pt-2 border-t border-stone-100 md:border-t-0">
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-[Poppins] font-semibold text-[#8B2635] hover:bg-red-50 transition-colors cursor-pointer"
                    >
                        <FiLogOut size={17} className="shrink-0" />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 min-w-0">
                <Outlet />
            </main>
            <ConfirmLogoutModal
                isOpen={showLogoutConfirm}
                onCancel={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
            />
        </div>
    )
}

export default AdminLayout