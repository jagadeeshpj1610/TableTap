import { FiLogOut } from "react-icons/fi"

const DashboardHeader = ({ subtitle, onLogoutClick }) => {
    return (
        <header className="bg-[#1F2225] border-b border-neutral-700 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
                <div>
                    <h2 className="font-[Poppins] font-extrabold text-lg text-white tracking-tight">
                        TableTap
                    </h2>
                    <p className="font-[Poppins] text-xs font-medium text-neutral-400 mt-0.5">
                        {subtitle}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D5F3E] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D5F3E]"></span>
                        </span>
                        <span className="font-[Poppins] text-xs font-semibold text-neutral-400">
                            Live
                        </span>
                    </div>
                    <button
                        onClick={onLogoutClick}
                        className="flex items-center gap-1.5 text-xs font-[Poppins] font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <FiLogOut size={14} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;