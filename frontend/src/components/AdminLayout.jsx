import { NavLink, Outlet } from "react-router-dom"

const links = [
    { to: "/admin/overview", label: "Overview" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/menu", label: "Menu" },
    {to: "/admin/waiter-calls", label : "Waiter-calls" },
]

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row">
            <aside className="bg-white border-b md:border-b-0 md:border-r border-stone-200 md:w-60 md:min-h-screen md:sticky md:top-0 md:self-start shrink-0">
                <div className="px-5 py-4 md:py-6">
                    <h2 className="font-[Fraunces] text-xl font-semibold text-[#8B2635]">
                        TableTap
                    </h2>
                    <p className="text-xs text-[#767676]">Admin</p>
                </div>

                <nav className="flex md:flex-col gap-1 overflow-x-auto px-3 pb-3 md:pb-6">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `shrink-0 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                                    isActive
                                        ? "bg-[#8B2635] text-white"
                                        : "text-[#1A1A1A] hover:bg-[#FAF7F2]"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 min-w-0">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout