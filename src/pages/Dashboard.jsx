import useAuthStore from "../store/authStore";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import TutorDashboard from "../components/dashboard/TutorDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";

const Dashboard = () => {
  const { user } = useAuthStore();
  const role = user?.role;
  const known = role === "admin" || role === "tutor" || role === "student";

  // Defensive fallback: a logged-in account with no recognised role would
  // otherwise render a blank screen. Show a helpful message instead.
  if (!known) {
    return (
      <div className="min-h-screen bg-[#07071b] text-white flex flex-col items-center justify-center px-4 text-center gap-3">
        <h1 className="text-2xl font-bold">
          Welcome<span className="text-[#c9a84c]">.</span>
        </h1>
        <p className="text-gray-400 max-w-md">
          Your account doesn't have a dashboard role assigned yet. Please contact
          VocalPlus Academy support if you believe this is a mistake.
        </p>
      </div>
    );
  }

  return (
    <>
      {role === "admin" && <AdminDashboard />}
      {role === "tutor" && <TutorDashboard />}
      {role === "student" && <StudentDashboard />}
    </>
  );
};

export default Dashboard;
