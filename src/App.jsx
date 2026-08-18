import { BrowserRouter, Routes, Route } from "react-router-dom"
import useAuthStore from "./store/authStore"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Courses from "./pages/Courses"
import Dashboard from "./pages/Dashboard"
import PaymentCallback from "./pages/PaymentCallback"
import AuthCallback from "./pages/AuthCallback"
import PublicNavbar from "./components/PublicNavbar"
import AuthNavbar from "./components/AuthNavbar"
import ProtectedRoute from "./components/ProtectedRoute"
import ForgotPassword from "./pages/ForgotPassword"
import VerifyEmail from "./pages/VerifyEmail"
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/NotFound"


const AppLayout = () => {
  const { token } = useAuthStore()
  return (
    <>
    {token ? <AuthNavbar /> : <PublicNavbar />}
      <main className="pt-20 bg-[#07071b]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/callback"
            element={
              <ProtectedRoute>
                <PaymentCallback />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/:token" element={<VerifyEmail/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
