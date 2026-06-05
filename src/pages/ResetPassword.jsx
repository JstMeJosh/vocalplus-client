import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (password !== verifiedPassword) {
      return setError("New passwords do not match.");
    }
    
    try {
      setLoading(true);
      const response = await api.post(`/auth/v1/reset-password/${token}`, {
        password,
      });
      setSuccess(response.data.message);
      setPassword("");
      setVerifiedPassword("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
      setPassword("");
      setVerifiedPassword("");
    }
  };

  return (
    <section
      className="min-h-screen bg-[#07071b] flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/mic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-b from-[#07071b]/90 via-[#07071b]/80 to-[#07071b]/95" />

      <div className="relative z-10 bg-[#1a1a2e]/90 backdrop-blur-md border border-[#c9a84c]/20 rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 text-white text-center shadow-2xl shadow-black/60">
        
        {success ? (
          <div className="flex flex-col gap-5 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mx-auto shadow-lg shadow-green-500/5">
              <span className="text-green-400 text-4xl font-light">✓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Password Updated!</h1>
              <p className="text-gray-400 text-sm leading-relaxed px-2">{success}</p>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="mt-2 bg-[#c9a84c] hover:bg-[#b0923d] text-[#07071b] font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#c9a84c]/20 transform hover:-translate-y-0.5 active:translate-y-0 w-full"
            >
              Back to Login
            </button>
          </div>
        ) : (
          /* REGULAR PASSWORD FORM VIEW */          <>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Create New Password</h1>
              <p className="text-gray-400 text-xs">Ensure your new password is secure and memorable.</p>
            </div>


            {error && (
              <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center animate-fadeIn flex items-center justify-center gap-2">
                <span className="font-bold">✕</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 text-left">
                <input
                  type="password"
                  required
                  placeholder="Your New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#07071b]/60 border border-gray-700/60 focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 text-white p-3 rounded-xl outline-none transition-all duration-300 text-sm placeholder:text-gray-500"
                />
                <input
                  type="password"
                  required
                  placeholder="Re-enter Your New Password"
                  value={verifiedPassword}
                  onChange={(e) => setVerifiedPassword(e.target.value)}
                  className="w-full bg-[#07071b]/60 border border-gray-700/60 focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/20 text-white p-3 rounded-xl outline-none transition-all duration-300 text-sm placeholder:text-gray-500"
                />
              </div>

              <button
                disabled={loading}
                className="mt-2 bg-[#c9a84c] hover:bg-[#b0923d] text-[#07071b] font-bold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#c9a84c]/20 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none text-sm w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#07071b] border-t-transparent rounded-full animate-spin" />
                    <span>Updating Password...</span>
                  </div>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;