import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#07071b] text-white py-12 px-4" id="socials">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-2xl">VocalPlus Academy</h3>
          <p className="italic text-[#c9a84c] text-sm mt-1">
            ...You can be a better singer
          </p>
        </div>

        {/* Social links */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-400 font-bold">Follow us on:</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://web.facebook.com/Coacharoldd"
              className="text-blue-500 hover:text-blue-400 font-bold transition-all duration-300 flex items-center gap-2"
            >
              <FaFacebook size={20} /> Facebook
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.tiktok.com/@coacharoldd"
              className="text-white hover:text-gray-300 font-bold transition-all duration-300 flex items-center gap-2"
            >
              <FaTiktok size={20}/>
              TikTok
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/coacharoldd/"
              className="text-pink-500 hover:text-pink-400 font-bold transition-all duration-300 flex items-center gap-2"
            >
              <FaInstagram size={20}/>
              Instagram
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.threads.com/@coacharold"
              className="text-gray-300 hover:text-white font-bold transition-all duration-300 flex items-center gap-2"
            >
              <SiThreads size={20}/>
              Threads
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} VocalPlus Academy. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
