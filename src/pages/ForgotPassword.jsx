import { useState } from "react";
import api from "../lib/axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSuccess("");
      setError("");
      const response = await api.post("auth/v1/forgot-password", { email });
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      className="min-h-screen bg-[#07071b] flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/assets/mic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#07071b]/85" />
      <div className="relative z-10 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded-xl p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-white text-center">
          Forgot-Password
        </h1>
        {error && (
          <p className="text-red-400 text-sm text-center bg-red-400/10 p-3 rounded-lg">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-400 text-sm text-center bg-green-400/10 p-3 rounded-lg">
            {success}
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="YourEmail@example.com"
            className="bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white p-3 rounded-lg outline-none transition-all duration-300"
          />
          <button
            disabled={loading}
            className={`bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-3 rounded-lg transition-all duration-300 ${loading ? "animate-pulse opacity-70" : ""}`}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </form>
        <p className="text-gray-400 text-center text-sm">
          Remembered Password ?{" "}
          <Link
            to="/login"
            className="text-[#c9a84c] font-bold hover:underline"
          >
            Login
          </Link>
        </p>
        <p className="text-gray-400 text-center text-sm">
          New User ?{" "}
          <Link
            to="/signup"
            className="text-[#c9a84c] font-bold hover:underline"
          >
            Sign-up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
