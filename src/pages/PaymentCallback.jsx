import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

const verifyPayment = async (reference) => {
  const res = await api.get(`/api/v1/payments/verify/${reference}`);
  return res.data;
};

// Landing page Paystack redirects back to after checkout. We read the
// transaction reference from the query string and confirm it with our backend.
const PaymentCallback = () => {
  const [params] = useSearchParams();
  const reference = params.get("reference") || params.get("trxref");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["verify-payment", reference],
    queryFn: () => verifyPayment(reference),
    enabled: !!reference,
    retry: false,
  });

  const noReference = !reference;
  const verifying = !noReference && isLoading;
  const failed = noReference || isError;
  const failMessage = noReference
    ? "No payment reference was found in the link."
    : error?.response?.data?.message ||
      "We couldn't verify this payment. If you were charged, please contact support.";

  return (
    <section className="min-h-screen bg-[#07071b] flex items-center justify-center px-4">
      <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-2xl p-8 w-full max-w-md text-center flex flex-col items-center gap-5 shadow-2xl shadow-black/50">
        {verifying ? (
          <>
            <div className="w-16 h-16 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
            <h1 className="text-xl font-bold text-white">
              Verifying your payment…
            </h1>
            <p className="text-gray-400 text-sm">
              Hang tight, this only takes a moment.
            </p>
          </>
        ) : failed ? (
          <>
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center">
              <span className="text-red-400 text-4xl">✕</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Payment Not Confirmed</h1>
            <p className="text-gray-400 text-sm">{failMessage}</p>
            <Link
              to="/dashboard"
              className="mt-2 w-full bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-3 rounded-xl transition-all duration-300"
            >
              Back to Dashboard
            </Link>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center">
              <span className="text-green-400 text-4xl">✓</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
            <p className="text-gray-400 text-sm">
              {data?.message || "Your payment has been confirmed. Thank you!"}
            </p>
            <Link
              to="/dashboard"
              className="mt-2 w-full bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-3 rounded-xl transition-all duration-300"
            >
              Back to Dashboard
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default PaymentCallback;
