import { useState } from "react";
import { Link } from "react-router-dom";
const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#07071b] text-white flex items-center justify-between w-full fixed top-0 p-4 z-50">
        <Link to="/">
          <h1 className="font-bold text-2xl">VocalPlus Academy</h1>
          <p className="italic text-[#c9a84c] font-bold text-sm">
            ...You can be a better singer
          </p>
        </Link>

        <ul className="hidden md:flex gap-8 font-bold items-center">
          <a
            className="hover:text-[#c9a84c] transition-all duration-300"
            href="/#"
          >
            Home
          </a>
          <a
            className="hover:text-[#c9a84c] transition-all duration-300"
            href="/#courses"
          >
            Courses
          </a>
          <a
            className="hover:text-[#c9a84c] transition-all duration-300"
            href="/#socials"
          >
            Social
          </a>
        </ul>

        <div className="hidden md:flex gap-2 items-center">
          <Link to="/login">
            <button className="bg-[#c9a84c] hover:bg-[#967f3e] px-4 py-2 rounded-md font-bold transition-all duration-300">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="border-2 border-[#c9a84c] hover:bg-[#c9a84c] px-4 py-2 rounded-md font-bold transition-all duration-300">
              Sign Up
            </button>
          </Link>
        </div>

        <button
          className="text-[#c9a84c] md:hidden text-3xl"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "X" : "☰"}
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#07071b] z-40 transition-transform duration-300 md:hidden flex flex-col p-8 gap-6 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#c9a84c] font-bold text-xl">Menu</h2>
          <button
            className="text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <a
          className="text-white font-bold text-xl hover:text-[#c9a84c] transition-all duration-300 border-b border-gray-800 pb-4"
          href="/"
          onClick={() => setIsOpen(false)}
        >
          Home
        </a>
        <a
          className="text-white font-bold text-xl hover:text-[#c9a84c] transition-all duration-300 border-b border-gray-800 pb-4"
          href="/#courses"
          onClick={() => setIsOpen(false)}
        >
          Courses
        </a>
        <a
          className="text-white font-bold text-xl hover:text-[#c9a84c] transition-all duration-300 border-b border-gray-800 pb-4"
          href="/#socials"
          onClick={() => setIsOpen(false)}
        >
          Social
        </a>

        <div className="flex flex-col gap-3 mt-auto">
          <Link to="/login" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-[#c9a84c] hover:bg-[#967f3e] px-4 py-3 rounded-md font-bold text-xl text-white">
              Login
            </button>
          </Link>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            <button className="w-full border-2 border-[#c9a84c] hover:bg-[#c9a84c] px-4 py-3 rounded-md font-bold text-xl text-white">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PublicNavbar;
