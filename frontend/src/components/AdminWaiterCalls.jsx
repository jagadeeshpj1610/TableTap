import { useWaiterCalls } from "../hooks/useWaiterCalls";
import WaiterCallCard from "./WaiterCallCard";

const AdminWaiterCalls = () => {
    const { calls, loading, resolveCall } = useWaiterCalls(5000);

    const pendingCalls = calls.filter((call) => call.status !== "resolved");

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
            <div className="mb-8">
                <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                    Waiter Calls
                </h1>
                <p className="font-[Poppins] text-sm text-[#767676] mt-1">
                    Live requests from tables, refreshing automatically
                </p>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-stone-200" />
                                <div>
                                    <div className="h-4 w-32 bg-stone-200 rounded mb-2" />
                                    <div className="h-3 w-16 bg-stone-200 rounded" />
                                </div>
                            </div>
                            <div className="h-9 w-20 bg-stone-200 rounded-full" />
                        </div>
                    ))}
                </div>
            ) : pendingCalls.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm py-16 text-center">
                    <p className="font-[Poppins] text-[#767676] text-sm">No pending waiter calls.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {pendingCalls.map((call) => (
                        <WaiterCallCard key={call._id} call={call} onResolve={resolveCall} theme="light" />
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminWaiterCalls