import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";
import api from "../../lib/axios";

// ---- data fetchers -------------------------------------------------------
const fetchEnrollments = async () => {
  const res = await api.get("/api/v1/enrollments/my");
  return res.data.allEnrollment || [];
};
const fetchClasses = async () => {
  const res = await api.get("/api/v1/classes/my");
  return res.data.classes || [];
};
const fetchAnnouncements = async () => {
  const res = await api.get("/api/v1/announcements");
  return res.data.allAnnouncements || [];
};

// ---- small presentational helpers ---------------------------------------
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusStyles = {
  paid: "bg-green-500/20 text-green-400",
  partial: "bg-yellow-500/20 text-yellow-400",
  pending: "bg-red-500/20 text-red-400",
  failed: "bg-red-500/20 text-red-400",
};

const platformLabels = {
  "google-meet": "Google Meet",
  zoom: "Zoom",
  tiktok: "TikTok",
  facebook: "Facebook",
  instagram: "Instagram",
};

const StudentDashboard = () => {
  const { user } = useAuthStore();

  const enrollmentsQuery = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: fetchEnrollments,
  });
  const classesQuery = useQuery({
    queryKey: ["my-classes"],
    queryFn: fetchClasses,
  });
  const announcementsQuery = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });

  const enrollments = enrollmentsQuery.data || [];
  const classes = classesQuery.data || [];
  const announcements = announcementsQuery.data || [];

  // Kick off a Paystack payment for one enrollment, then redirect to their
  // hosted checkout. The backend computes the exact outstanding balance.
  const payMutation = useMutation({
    mutationFn: (enrollmentId) =>
      api.post("/api/v1/payments/initialize", { enrollmentId }),
    onSuccess: (res) => {
      const url = res.data?.authorization_url;
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Could not start the payment. Please try again.");
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Unable to start payment.");
    },
  });

  const now = new Date();
  const upcomingClasses = classes
    .filter((c) => c.status === "scheduled" || c.status === "ongoing")
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

  const outstanding = enrollments.filter(
    (e) => e.paymentStatus === "pending" || e.paymentStatus === "partial",
  ).length;

  const stats = [
    { label: "My Courses", value: enrollments.length, icon: "📚" },
    { label: "Upcoming Classes", value: upcomingClasses.length, icon: "🎤" },
    { label: "Payments Due", value: outstanding, icon: "💳" },
  ];

  return (
    <div className="min-h-screen bg-[#07071b] text-white p-6">
      {/* Greeting */}
      <section className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome back, <span className="text-[#c9a84c]">{user?.name}</span> 🎵
        </h1>
        <p className="text-gray-400 mt-1">
          Here's what's happening with your musical journey.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-10">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-4"
            >
              <span className="text-2xl md:text-3xl">{s.icon}</span>
              <p className="text-gray-400 text-xs md:text-sm mt-2">{s.label}</p>
              <p className="text-white font-bold text-xl md:text-2xl mt-1">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* My Enrollments */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          My <span className="text-[#c9a84c]">Courses</span>
        </h2>

        {enrollmentsQuery.isLoading ? (
          <p className="text-gray-400">Loading your courses…</p>
        ) : enrollmentsQuery.isError ? (
          <p className="text-red-400">Couldn't load your courses.</p>
        ) : enrollments.length === 0 ? (
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-6 text-gray-400">
            You're not enrolled in any course yet. An admin will enroll you after
            your voice assessment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrollments.map((e) => {
              const canPay =
                e.paymentStatus === "pending" || e.paymentStatus === "partial";
              const paying =
                payMutation.isPending && payMutation.variables === e._id;
              return (
                <div
                  key={e._id}
                  className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-5 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="text-[#c9a84c] font-bold text-lg">
                        {e.course?.name || "Course"}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Starts {e.startDate ? formatDate(e.startDate) : "—"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        statusStyles[e.paymentStatus] || "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {e.paymentStatus}
                    </span>
                  </div>

                  {e.course?.price != null && (
                    <p className="text-white font-bold">
                      ₦{e.course.price.toLocaleString()}
                    </p>
                  )}

                  {e.analysisReport && (
                    <p className="text-gray-400 text-sm border-l-2 border-[#c9a84c]/40 pl-3">
                      {e.analysisReport}
                    </p>
                  )}

                  {canPay && (
                    <button
                      onClick={() => payMutation.mutate(e._id)}
                      disabled={paying}
                      className="mt-1 bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-2 rounded-lg transition-all duration-300 disabled:opacity-60"
                    >
                      {paying
                        ? "Redirecting to checkout…"
                        : e.paymentStatus === "partial"
                          ? "Pay Balance"
                          : "Pay Now"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Upcoming Classes */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Upcoming <span className="text-[#c9a84c]">Classes</span>
        </h2>

        {classesQuery.isLoading ? (
          <p className="text-gray-400">Loading your classes…</p>
        ) : classesQuery.isError ? (
          <p className="text-red-400">Couldn't load your classes.</p>
        ) : upcomingClasses.length === 0 ? (
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-6 text-gray-400">
            No classes scheduled yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingClasses.map((c) => {
              const startsSoon = new Date(c.scheduledAt) - now < 15 * 60 * 1000;
              const joinable = c.status === "ongoing" || startsSoon;
              return (
                <div
                  key={c._id}
                  className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-5 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-white font-bold">{c.title}</h3>
                    <span className="text-xs text-[#c9a84c] capitalize">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {c.course?.name}
                    {c.tutor?.name ? ` · ${c.tutor.name}` : ""}
                  </p>
                  <p className="text-gray-400 text-sm">
                    🗓 {formatDateTime(c.scheduledAt)}
                    {c.duration ? ` · ${c.duration} min` : ""}
                  </p>
                  {c.platform && (
                    <p className="text-gray-500 text-xs">
                      {platformLabels[c.platform] || c.platform}
                    </p>
                  )}
                  <a
                    href={c.classLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-2 text-center font-bold py-2 rounded-lg transition-all duration-300 ${
                      joinable
                        ? "bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b]"
                        : "bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/40 hover:bg-[#c9a84c]/20"
                    }`}
                  >
                    {joinable ? "Join Class" : "View Link"}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Announcements */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-[#c9a84c]">Announcements</span>
        </h2>

        {announcementsQuery.isLoading ? (
          <p className="text-gray-400">Loading announcements…</p>
        ) : announcementsQuery.isError ? (
          <p className="text-red-400">Couldn't load announcements.</p>
        ) : announcements.length === 0 ? (
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-6 text-gray-400">
            No announcements right now.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {announcements.map((a) => (
              <div
                key={a._id}
                className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-5"
              >
                <div className="flex justify-between items-start gap-3">
                  <h3 className="text-[#c9a84c] font-bold">{a.title}</h3>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(a.createdAt)}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mt-2 whitespace-pre-line">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
