import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useState, useEffect, useRef } from "react";

const VerifyEmail = () => {
  const { token } = useParams();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [resendError, setResendError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const hasVerified = useRef(false)
  useEffect(() => {
    if(hasVerified.current)return;
    hasVerified.current = true;
    const verify = async () => {
      try {
        const response = await api.get(`/api/v1/verify/${token}`);
        setSuccess(response.data.message);
        setError("");
      } catch (error) {
        setError(error.response?.data?.message || "Something went wrong. Please try again.");
        setSuccess("")
      }
    };
    verify();
  });

  const handleResend = async (e) => {
    try {
      e.preventDefault();
      setResendError("");
      const response = await api.post("/api/v1/resend-verification", {
        email,
      });
      setResendSuccess(response.data.message);
    } catch (error) {
      setResendError(error.response.data.message);
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
      <div className="relative z-10 bg-[#1a1a2e] border border-[#c9a84c]/30 rounded-xl p-8 w-full max-w-md flex flex-col gap-6 text-white text-center">
        {success && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto">
              <span className="text-green-500 text-3xl">✓</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Email Verified!</h1>
            <p className="text-gray-400">{success}</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-3 rounded-lg transition-all duration-300"
            >
              Go to Login
            </button>
          </>
        )}

        {error && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto">
              <span className="text-red-500 text-3xl">✕</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              Verification Failed
            </h1>
            <p className="text-red-400">{error}</p>

            <div className="border-t border-gray-800 pt-6 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-[#c9a84c]">
                Resend Verification Email
              </h2>
              {resendSuccess && (
                <p className="text-green-400 text-sm bg-green-400/10 p-3 rounded-lg">
                  {resendSuccess}
                </p>
              )}
              {resendError && (
                <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                  {resendError}
                </p>
              )}
              <form onSubmit={handleResend} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Re-enter your email"
                  className="bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white p-3 rounded-lg outline-none transition-all duration-300"
                />
                <button className="bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-3 rounded-lg transition-all duration-300">
                  Resend Email
                </button>
              </form>
            </div>
          </>
        )}

        {!success && !error && (
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin w-12 h-12 border-4 border-[#c9a84c] border-t-transparent rounded-full" />
            <p className="text-lg font-bold">Verifying your email...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifyEmail;
