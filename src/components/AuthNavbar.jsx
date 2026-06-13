import { useState } from "react"
import useAuthStore from "../store/authStore"
import { useNavigate, Link } from "react-router-dom"

const AuthNavbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { logout, user } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  // Get initials from name
  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase()

  return (
    <>
      <nav className="bg-[#07071b] text-white flex items-center justify-between w-full fixed top-0 p-4 z-50">
        
        {/* Logo */}
        <Link to="/dashboard">
          <h1 className="font-bold text-xl">VocalPlus Academy</h1>
          <p className="italic text-[#c9a84c] font-bold text-xs">...You can be a better singer</p>
        </Link>

        {/* Desktop — user info + logout */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/dashboard" className="text-white hover:text-[#c9a84c] font-bold transition-all duration-300">Dashboard</Link>
          <Link to="/enrollment" className="text-white hover:text-[#c9a84c] font-bold transition-all duration-300">Enrollment</Link>
          <Link to="/announcement" className="text-white hover:text-[#c9a84c] font-bold transition-all duration-300">Announcement</Link>
          
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#c9a84c] text-[#07071b] font-bold flex items-center justify-center text-sm">
              {initials}
            </div>
            <div>
              <p className="text-white font-bold text-sm">{user?.name}</p>
              <p className="text-[#c9a84c] text-xs capitalize">{user?.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 px-4 py-2 rounded-md font-bold transition-all duration-300">
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="text-[#c9a84c] md:hidden text-3xl" onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)}/>
      )}

      {/* Mobile drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#07071b] z-40 transition-transform duration-300 md:hidden flex flex-col p-8 gap-6 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#c9a84c] font-bold text-xl">Menu</h2>
          <button className="text-white text-2xl" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* User info in drawer */}
        <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
          <div className="w-12 h-12 rounded-full bg-[#c9a84c] text-[#07071b] font-bold flex items-center justify-center text-lg">
            {initials}
          </div>
          <div>
            <p className="text-white font-bold">{user?.name}</p>
            <p className="text-[#c9a84c] text-sm capitalize">{user?.role}</p>
          </div>
        </div>

        <Link className="text-white font-bold text-xl hover:text-[#c9a84c] transition-all duration-300 border-b border-gray-800 pb-4" to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link className="text-white font-bold text-xl hover:text-[#c9a84c] transition-all duration-300 border-b border-gray-800 pb-4" to="/enrollment" onClick={() => setIsOpen(false)}>Enrollment</Link>
        <Link className="text-white font-bold text-xl hover:text-[#c9a84c] transition-all duration-300 border-b border-gray-800 pb-4" to="/announcement" onClick={() => setIsOpen(false)}>Announcement</Link>

        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 px-4 py-3 rounded-md font-bold transition-all duration-300">
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default AuthNavbar