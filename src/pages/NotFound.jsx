import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[#07071b] flex flex-col items-center justify-center text-white gap-6">
      <h1 className="text-8xl font-bold text-[#c9a84c]">404</h1>
      <p className="text-2xl font-bold">Page Not Found</p>
      <p className="text-gray-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold px-6 py-3 rounded-lg transition-all duration-300">
        Go Home
      </Link>
    </section>
  )
}

export default NotFound