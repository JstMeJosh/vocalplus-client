import api from "../../lib/axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EnrollStudentModal = ({ onClose, onSuccess }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [analysisReport, setAnalysisReport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          api.get("/users/v1/get-user"),
          api.get("/courses/v1/courses"),
        ]);
        setStudents(studentsRes.data.students);
        setCourses(coursesRes.data.courses);
      } catch (error) {
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/enrollments/v1/create-enrollment", {
        student: selectedStudent,
        course: selectedCourse,
        analysisReport,
        startDate,
      });
      onSuccess(response.data.message);
      onClose();
    } catch (error) {
      console.log("error ", error.response)
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-[#1a1a2e] border border-[#c9a84c]/30 rounded-xl p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Enroll <span className="text-[#c9a84c]">Student</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
            className="bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white p-3 rounded-lg outline-none transition-all duration-300"
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
            className="bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white p-3 rounded-lg outline-none transition-all duration-300"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name} — ₦{course.price.toLocaleString()}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Analysis report..."
            value={analysisReport}
            onChange={(e) => setAnalysisReport(e.target.value)}
            rows={4}
            className="bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white p-3 rounded-lg outline-none transition-all duration-300 resize-none"
          />

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="DD/MM/YYYY"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white p-3 rounded-lg outline-none transition-all duration-300 w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-3 rounded-lg transition-all duration-300 ${loading ? "animate-pulse opacity-70" : ""}`}
          >
            {loading ? "Enrolling..." : "Enroll Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnrollStudentModal;
