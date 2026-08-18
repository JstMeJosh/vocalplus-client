import { motion } from "framer-motion";
import CourseCard from "../components/CourseCard";
import TestimonialCard from "../components/TestimonialCard";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import api from "../lib/axios";

const MotionLink = motion.create(Link);
const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/api/v1/courses");
        setCourses(response.data.courses.slice(0, 3));
      } catch (error) {
        // setError("Failed to load courses")
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Chioma Okafor",
      role: "Voice Student",
      text: "VocalPlus completely transformed my singing. Coach Harold's approach is unique and results-driven. I went from struggling with pitch to performing at church events within 3 months.",
      avatar: "CO",
    },
    {
      id: 2,
      name: "Emeka Nwosu",
      role: "Keyboard Student",
      text: "The keyboard classes here are exceptional. The tutors break down complex techniques into simple steps. Best investment I've made in my musical journey.",
      avatar: "EN",
    },
    {
      id: 3,
      name: "Adaeze Ibe",
      role: "Voice & Theory Student",
      text: "I've tried other music schools but nothing compares to VocalPlus. The combination of voice training and music theory has made me a complete musician.",
      avatar: "AI",
    },
    {
      id: 4,
      name: "Tunde Adeleke",
      role: "Music Scoring Student",
      text: "Coach Harold's passion for music is infectious. The scoring class opened my eyes to a whole new world of music composition. Highly recommended!",
      avatar: "TA",
    },
    {
      id: 5,
      name: "Blessing Eze",
      role: "Voice Student",
      text: "Within 6 months at VocalPlus Academy, I recorded my first single. The vocal techniques I learned here gave me the confidence I needed.",
      avatar: "BE",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % testimonials.length),
      5000,
    );

    return () => clearInterval(timer);
  });
  const doubled = [...testimonials, ...testimonials];
  const visible = doubled.slice(currentIndex, currentIndex + 3);
  return (
    <>
      <section
        className="pt-24 md:min-h-screen text-white relative"
        style={{
          backgroundImage: "url('/assets/mic.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1a1a2e]/80" />
        <section
          id="hero-section"
          className=" min-h-screen w-full text-center md:text-left md:flex flex-col md:flex-row p-4  items-center justify-center gap-4 relative z-10"
        >
          <div className="max-w-2xl space-y-4 text-lg">
            <motion.h1
              className="font-bold text-5xl mb-2 md:text-7xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
            >
              Where Passion Meets Music
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              <b className="text-xl text-[#c9a84c]">VocalPLus Academy</b> is a
              voice training school out to teach the art of singing and good
              musicianship
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
            >
              Our aim is to be the bridge between a singer's passion and his/her
              achievement
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6 }}
            >
              The school started since 2003 and has since then produced great
              singers
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6 }}
              className="mb-8"
            >
              Coach Harold has worked with numerous artists including{" "}
              <span className="text-[#c9a84c] font-bold">
                Kenny'kore, Nathaniel Bassey, Tolu Odukoya Ijogun
              </span>{" "}
              and many more.
            </motion.p>
            <MotionLink
              to="/signup"
              className="bg-[#c9a84c] md:mx-48 rounded-md p-4 font-bold text-xl hover:rounded-full"
            >
              Register now
            </MotionLink>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 250 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0 }}
            className="pt-16 md:pt-0 flex items-center flex-col gap-2"
          >
            <div className="border-gray-700 border-4 w-56 h-56 md:w-72 md:h-72 rounded-full p-4">
              <img
                src="/assets/h.jpg"
                alt="Harold Ettah"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-[#c9a84c]"
              />
            </div>
            <b className="text-xl">Harold Ettah</b>
          </motion.div>
        </section>

        {/* courses Section */}
        <motion.section
          className="py-20 px-4 bg-gradient-to-b from-[#07071b]/80 to-[#1a1a2e]/80 relative"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          id="courses"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-2 p-4">
            Our <span className="text-[#c9a84c]">Courses</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Choose your path to musical excellence
          </p>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
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
          ) : courses.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              No courses available at the moment. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-block border-2 border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#07071b] text-[#c9a84c] px-8 py-3 rounded-md font-bold transition-all duration-300"
            >
              View All Courses →
            </Link>
          </div>
        </motion.section>
      </section>

      {/* testimonial section */}
      <section className="py-20 px-4 bg-[#07071b]">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          What <span className="text-[#c9a84c]">Students</span> Say
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Real stories from real musicians
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visible.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-4 text-center relative"
        style={{
          backgroundImage: "url('/assets/mic.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#1a1a2e]/85" />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Find Your <span className="text-[#c9a84c]">Voice?</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Book a free trial session with Coach Harold today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="bg-[#c9a84c] hover:bg-[#967f3e] px-8 py-4 rounded-md font-bold text-xl transition-all duration-300"
            >
              Book Free Trial
            </Link>
            <a
              href="/#courses"
              className="border-2 border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#07071b] px-8 py-4 rounded-md font-bold text-xl text-white transition-all duration-300"
            >
              View Courses
            </a>
          </div>
        </div>
      </section>

      {/* footer-section */}
      <Footer />
    </>
  );
};

export default Home;
