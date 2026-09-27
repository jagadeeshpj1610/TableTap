import { Navigate, useLocation } from "react-router-dom"
import { getToken, getRole } from "../utils/auth"

const ProtectedRoute = ({ allowedRoles, children }) => {
    const token = getToken()
    const role = getRole()
    const location = useLocation()

    if (!token || !allowedRoles.includes(role)) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    return children
}

export default ProtectedRoute