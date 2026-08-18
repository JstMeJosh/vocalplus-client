import { Navigate } from "react-router-dom"
import useAuthStore from "../store/authStore"

// Guards routes that require authentication. Pass an optional `roles` array to
// restrict a route to specific roles — a logged-in user without an allowed
// role is sent to their own dashboard rather than the login screen.
const ProtectedRoute = ({ children, roles }) => {
  const { token, user } = useAuthStore()

  if (!token) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

export default ProtectedRoute
