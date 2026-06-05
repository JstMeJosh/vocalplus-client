import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useSearchParams, Link } from "react-router-dom";

const AuthCallback = () => {
  const { login } = useAuthStore();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      login(token);
      window.location.href = "/dashboard";
    }
  });

  return (
    <section className="min-h-screen bg-[#07071b] flex flex-col items-center justify-center gap-4 text-white">
      <div className="animate-spin w-12 h-12 border-4 border-[#c9a84c] border-t-transparent rounded-full" />
      <p className="text-lg font-bold">Redirecting to your dashboard...</p>
      <p className="text-gray-400 text-sm">
        Not redirecting?{" "}
        <Link to="/dashboard" className="text-[#c9a84c] hover:underline">
          Click here
        </Link>
      </p>
    </section>
  );
};

export default AuthCallback;
