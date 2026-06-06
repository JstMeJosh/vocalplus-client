import { BrowserRouter, Routes, Route } from "react-router-dom"
import useAuthStore from "./store/authStore"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AuthCallback from "./pages/AuthCallback"
import PublicNavbar from "./components/PublicNavbar"
import AuthNavbar from "./components/AuthNavbar"
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/:token" element={<VerifyEmail/>}/>
          <Route path="/reset-Password/:token" element={<ResetPassword/>}/>
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