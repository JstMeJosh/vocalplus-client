import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import api from "../lib/axios"
import CourseCard from "../components/CourseCard"
import Footer from "../components/Footer"

const fetchCourses = async () => {
  const res = await api.get("/api/v1/courses")
  return res.data.courses
}

const Courses = () => {
  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["courses"], queryFn: fetchCourses })

  return (
    <>
      <section className="min-h-screen bg-[#07071b] text-white px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Our <span className="text-[#c9a84c]">Courses</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From voice training to music theory — choose the path that fits
              your musical goals and learn directly from Coach Harold and our
              tutors.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-[#1a1a3e] rounded-xl p-6 animate-pulse"
                >
                  <div className="h-6 bg-gray-700 rounded mb-4 w-3/4" />
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-700 rounded mb-6 w-1/2" />
                  <div className="h-8 bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <p className="text-center text-red-400 py-10">
              We couldn't load the courses right now. Please try again later.
            </p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-400 py-10">
              No courses available at the moment. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Courses
