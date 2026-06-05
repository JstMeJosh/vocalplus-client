import { useState } from "react";
import EnrollStudentModal from "./EnrollStudentModal";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const stats = {
    totalStudents: 18,
    totalTutors: 4,
    totalCourses: 6,
    totalRevenue: 850000,
    pendingPayments: 3,
    partialPayments: 2,
  };
  const statCards = [
    { label: "Total Students", value: stats.totalStudents, icon: "👥" },
    { label: "Total Tutors", value: stats.totalTutors, icon: "🎵" },
    { label: "Total Courses", value: stats.totalCourses, icon: "📚" },
    {
      label: "Total Revenue",
      value: `₦${stats.totalRevenue.toLocaleString()}`,
      icon: "💰",
    },
    { label: "Pending Payments", value: stats.pendingPayments, icon: "⏳" },
    { label: "Partial Payments", value: stats.partialPayments, icon: "⚠️" },
  ];

  const recentEnrollments = [
    {
      id: 1,
      name: "Chioma Okafor",
      course: "Voice Training",
      status: "paid",
      date: "2026-05-28",
    },
    {
      id: 2,
      name: "Emeka Nwosu",
      course: "Keyboard",
      status: "pending",
      date: "2026-05-29",
    },
    {
      id: 3,
      name: "Adaeze Ibe",
      course: "Music Theory",
      status: "partial",
      date: "2026-05-30",
    },
  ];

  const [showEnrollModal, setShowEnrollModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#07071b] text-white p-6">
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
              <p className="text-white font-bold text-2xl mt-1">{stat.value}</p>
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
                    Date
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
                      key={enrollment.id}
                      className="border-b border-gray-800 hover:bg-[#c9a84c]/5 transition-all duration-300"
                    >
                      <td className="p-4 text-white font-semibold">
                        {enrollment.name}
                      </td>
                      <td className="p-4 text-gray-400">{enrollment.course}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            enrollment.status === "paid"
                              ? "bg-green-500/20 text-green-400"
                              : enrollment.status === "pending"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{enrollment.date}</td>
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
