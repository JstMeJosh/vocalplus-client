import useAuthStore from "../store/authStore";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import TutorDashboard from "../components/dashboard/TutorDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <>
      {user?.role === "admin" && <AdminDashboard />}
      {user?.role === "tutor" && <TutorDashboard />}
      {user?.role === "student" && <StudentDashboard />}
    </>
  );
};

export default Dashboard;
