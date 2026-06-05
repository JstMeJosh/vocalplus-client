import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <motion.div className="bg-[#1a1a3e] border border-[#c9a84c]/30 rounded-xl p-6 hover:border-[#c9a84c] transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a84c]/10" 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-[#c9a84c] font-bold text-xl mb-2">{course.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{course.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-white font-bold">₦{course.price.toLocaleString()}</span>
        <span className="text-gray-400 text-sm">{course.duration}</span>
      </div>
      <Link to="/login" className="block mt-4 w-full bg-[#c9a84c]/10 hover:bg-[#c9a84c] text-[#c9a84c] hover:text-[#07071b] border border-[#c9a84c] rounded-lg py-2 font-bold transition-all duration-300 text-center">
        Enroll Now
      </Link>
    </motion.div>
  )
}
export default CourseCard;
