import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";
import api from "../../lib/axios";
import ScheduleClassModal from "../class/ScheduleClassModal";

const fetchMyClasses = async () => {
  const res = await api.get("/api/v1/classes/my");
  return res.data.classes || [];
};

const formatDateTime = (d) =>
  new Date(d).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const platformLabels = {
  "google-meet": "Google Meet",
  zoom: "Zoom",
  tiktok: "TikTok",
  facebook: "Facebook",
  instagram: "Instagram",
};

const statusColors = {
  scheduled: "text-[#c9a84c]",
  ongoing: "text-green-400",
  completed: "text-gray-400",
  cancelled: "text-red-400",
};

const TutorDashboard = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const classesQuery = useQuery({
    queryKey: ["my-classes"],
    queryFn: fetchMyClasses,
  });
  const classes = classesQuery.data || [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      api.patch(`/api/v1/classes/${id}/status`, { status }),
    onSuccess: () => {
      toast.success("Class status updated");
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Could not update status"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/v1/classes/${id}`),
    onSuccess: () => {
      toast.success("Class deleted");
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Could not delete class"),
  });

  const upcoming = classes.filter(
    (c) => c.status === "scheduled" || c.status === "ongoing",
  ).length;
  const completed = classes.filter((c) => c.status === "completed").length;

  const stats = [
    { label: "Total Classes", value: classes.length, icon: "🎼" },
    { label: "Upcoming", value: upcoming, icon: "🎤" },
    { label: "Completed", value: completed, icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-[#07071b] text-white p-6">
      {/* Greeting + CTA */}
      <section className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Hi, <span className="text-[#c9a84c]">{user?.name}</span> 🎹
          </h1>
          <p className="text-gray-400 mt-1">Manage your classes and schedule.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap"
        >
          + Schedule Class
        </button>
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

      {/* My Classes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          My <span className="text-[#c9a84c]">Classes</span>
        </h2>

        {classesQuery.isLoading ? (
          <p className="text-gray-400">Loading your classes…</p>
        ) : classesQuery.isError ? (
          <p className="text-red-400">Couldn't load your classes.</p>
        ) : classes.length === 0 ? (
          <div className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-6 text-gray-400">
            You haven't scheduled any classes yet. Click “Schedule Class” to
            create your first one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((c) => (
              <div
                key={c._id}
                className="bg-[#1a1a2e] border border-[#c9a84c]/20 rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-white font-bold">{c.title}</h3>
                    <p className="text-gray-400 text-sm">{c.course?.name}</p>
                  </div>
                  <span
                    className={`text-xs font-bold capitalize ${statusColors[c.status] || "text-gray-400"}`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  🗓 {formatDateTime(c.scheduledAt)}
                  {c.duration ? ` · ${c.duration} min` : ""}
                </p>
                <p className="text-gray-500 text-xs">
                  {platformLabels[c.platform] || c.platform || "—"} ·{" "}
                  {c.students?.length || 0} student
                  {c.students?.length === 1 ? "" : "s"} · {c.type}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <a
                    href={c.classLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/40 hover:bg-[#c9a84c]/20 text-sm font-bold px-3 py-2 rounded-lg transition-all duration-300"
                  >
                    Open Link
                  </a>

                  <select
                    value={c.status}
                    onChange={(e) =>
                      statusMutation.mutate({ id: c._id, status: e.target.value })
                    }
                    disabled={statusMutation.isPending}
                    className="bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white text-sm px-2 py-2 rounded-lg outline-none"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Delete class "${c.title}"? This cannot be undone.`,
                        )
                      ) {
                        deleteMutation.mutate(c._id);
                      }
                    }}
                    className="ml-auto text-red-400 hover:text-red-300 text-sm font-bold px-3 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/10 transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showModal && <ScheduleClassModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default TutorDashboard;
