import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { login } from "../api/authApi"
import { saveAuth } from "../utils/auth"
import toast from "react-hot-toast"
import { connectStaffSocket } from "../socket"

const ROLES = [
    { value: "admin", label: "Admin" },
    { value: "kitchen", label: "Kitchen" },
    { value: "waiter", label: "Waiter" },
]

const Login = () => {
    const [role, setRole] = useState("admin")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await login(role, password)
            saveAuth(data.token, data.role)
            connectStaffSocket(data.token)
            toast.success(`Logged in as ${data.role}`)
            const redirectTo = location.state?.from || `/${data.role === "admin" ? "admin" : data.role}`
            navigate(redirectTo, { replace: true })
        } catch (err) {
            toast.error(err.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 w-full max-w-sm"
            >
                <h1 className="font-[Poppins] font-extrabold text-2xl text-[#1A1A1A] mb-1">
                    TableTap Staff
                </h1>
                <p className="font-[Poppins] text-sm text-[#767676] mb-6">
                    Sign in to continue
                </p>

                <label className="font-[Poppins] text-xs font-medium text-[#767676] block mb-1.5">
                    Role
                </label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="font-[Poppins] w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm mb-4 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                >
                    {ROLES.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                </select>

                <label className="font-[Poppins] text-xs font-medium text-[#767676] block mb-1.5">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="font-[Poppins] w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="font-[Poppins] font-bold w-full bg-[#2D5F3E] hover:bg-[#244c32] disabled:opacity-60 text-white py-2.5 rounded-full text-sm cursor-pointer transition-colors"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}

export default Login