import { useState, useEffect } from "react";
import EnrollStudentModal from "../enrollment/EnrollStudentModal";
import api from "../../lib/axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTutors, setTotalTutors] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError("");
        const [studentRes, tutorRes, coursesRes, enrollmentRes, paymentsRes] =
          await Promise.all([
            api.get("/api/v1/users?role=student"),
            api.get("/api/v1/users?role=tutor"),
            api.get("/api/v1/courses"),
            api.get("/api/v1/enrollments"),
            api.get("/api/v1/payments"),
          ]);
        setTotalStudents(studentRes.data.users?.length || 0);
        setTotalTutors(tutorRes.data.users?.length || 0);
        setTotalCourses(coursesRes.data.courses?.length || 0);
        setTotalEnrollments(enrollmentRes.data.allEnrollments || 0);
        setTotalRevenue(paymentsRes.data.totalRevenue || 0);
      } catch (error) {
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // const revenue this has to filter by  month
  const enrollmentArray = Array.isArray(totalEnrollments) ? totalEnrollments : [];

  const recentEnrollments = enrollmentArray.slice(0, 5);
  
  const pending = enrollmentArray.filter(
    (item) => item?.paymentStatus === "pending"
  ).length;

  const partial = enrollmentArray.filter(
    (item) => item?.paymentStatus === "partial"
  ).length;
  
  const stats = {
    totalStudents: totalStudents,
    totalTutors: totalTutors,
    totalCourses: totalCourses,
    totalRevenue: totalRevenue,
    pendingPayments: pending,
    partialPayments: partial,
  };

  const statCards = [
    { label: "Total Students", value: stats.totalStudents, icon: "👥" },
    { label: "Total Tutors", value: stats.totalTutors, icon: "🎵" },
    { label: "Total Courses", value: stats.totalCourses, icon: "📚" },
    {
      label: "Total Revenue",
      value: `₦${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: "💰",
    },
    { label: "Pending Payments", value: stats.pendingPayments, icon: "⏳" },
    { label: "Partial Payments", value: stats.partialPayments, icon: "⚠️" },
  ];

  const [showEnrollModal, setShowEnrollModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#07071b] text-white p-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-md text-center font-bold">{error}</p>
        </div>
      )}
      {/* Stats Section */}
      <section className="mb-10">
        <h1 className="text-2xl font-bold mb-6">
          All Time <span className="text-[#c9a84c]">Stats</span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-4 hover:border-[#c9a84c] transition-all duration-300"
            >
              <span className="text-3xl">{stat.icon}</span>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
              <p className="text-white font-bold text-2xl mt-1">
                {loading ? (
                  <span className="inline-block w-6 h-6 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
                ) : (
                  stat.value
               )}
              </p>
            </div>
          ))}
        </div>
        <button
          className="mt-6 bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold px-6 py-3 rounded-lg transition-all duration-300"
          onClick={() => setShowEnrollModal(true)}
        >
          + Enroll Student
        </button>
        {showEnrollModal && (
          <EnrollStudentModal
            onClose={() => setShowEnrollModal(false)}
            onSuccess={(message) => {
              toast.success(message);
              setShowEnrollModal(false);
            }}
          />
        )}
      </section>

      {/* Recent Enrollments */}
      <section>
        <h1 className="text-2xl font-bold mb-6">
          Recent <span className="text-[#c9a84c]">Enrollments</span>
        </h1>
        <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl overflow-hidden">
          <p className="text-gray-500 text-xs mb-2 md:hidden text-center font-bold">
            Swipe to see more
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead className="bg-[#c9a84c]/10 border-b border-[#c9a84c]/20">
                <tr>
                  <th className="text-left p-4 text-[#c9a84c] font-bold">
                    Name
                  </th>
                  <th className="text-left p-4 text-[#c9a84c] font-bold">
                    Course
                  </th>
                  <th className="text-left p-4 text-[#c9a84c] font-bold">
                    Status
                  </th>
                  <th className="text-left p-4 text-[#c9a84c] font-bold">
                    Start Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">
                      No enrollments yet. Register your first student to get
                      started.
                    </td>
                  </tr>
                ) : (
                  recentEnrollments.map((enrollment) => (
                    <tr
                      key={enrollment?._id}
                      className="border-b border-gray-800 hover:bg-[#c9a84c]/5 transition-all duration-300"
                    >
                      <td className="p-4 text-white font-semibold">
                        {enrollment.student?.name}
                      </td>
                      <td className="p-4 text-gray-400">
                        {enrollment.course?.name}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            enrollment.paymentStatus === "paid"
                              ? "bg-green-500/20 text-green-400"
                              : enrollment.paymentStatus === "pending"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {enrollment.paymentStatus}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">
                        {new Date(enrollment.startDate).toLocaleDateString("en-GB", {day: "numeric",
        month: "short",
        year: "numeric"})}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
