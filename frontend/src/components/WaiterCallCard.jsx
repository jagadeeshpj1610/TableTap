import { FiBell } from "react-icons/fi"

const WaiterCallCard = ({ call, onResolve, theme = "light" }) => {
    const isDark = theme === "dark";

    return (
        <div
            className={`rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm border-l-4 border-amber-500 ${
                isDark ? "bg-[#2A2E32]" : "bg-white"
            }`}
        >
            <div className="flex items-center gap-4 min-w-0">
                <div
                    className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                        isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-700"
                    }`}
                >
                    <FiBell size={18} />
                </div>
                <div className="min-w-0">
                    <p className={`font-[Poppins] font-bold ${isDark ? "text-white" : "text-[#1A1A1A]"}`}>
                        Table {call.tableNumber}
                    </p>
                    <p className={`font-[Poppins] text-xs ${isDark ? "text-neutral-400" : "text-[#767676]"}`}>
                        {new Date(call.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
            </div>
            <button
                onClick={() => onResolve(call._id)}
                className="font-[Poppins] font-bold shrink-0 bg-[#2D5F3E] hover:bg-[#244c32] text-white px-4 py-2.5 rounded-full text-sm cursor-pointer transition-colors"
            >
                Resolve
            </button>
        </div>
    );
};

export default WaiterCallCard;