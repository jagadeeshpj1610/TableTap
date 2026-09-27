const ConfirmLogoutModal = ({ isOpen, onCancel, onConfirm, dark = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className={`rounded-2xl shadow-sm p-6 w-full max-w-sm ${dark ? "bg-[#2A2E32]" : "bg-white"}`}>
                <h3 className={`font-[Poppins] font-bold text-lg mb-2 ${dark ? "text-white" : "text-[#1A1A1A]"}`}>
                    Log out?
                </h3>
                <p className={`font-[Poppins] text-sm mb-5 ${dark ? "text-neutral-400" : "text-[#767676]"}`}>
                    You'll need to sign in again to access this dashboard.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className={`flex-1 py-2.5 rounded-full text-sm font-[Poppins] font-semibold border cursor-pointer transition-colors ${
                            dark
                                ? "border-neutral-600 text-white hover:bg-neutral-700"
                                : "border-stone-300 text-[#1A1A1A] hover:bg-stone-50"
                        }`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2.5 rounded-full text-sm font-[Poppins] font-semibold bg-[#8B2635] hover:bg-[#741f2c] text-white cursor-pointer transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmLogoutModal;