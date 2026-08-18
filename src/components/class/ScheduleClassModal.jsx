import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const fetchCourses = async () => {
  const res = await api.get("/api/v1/courses");
  return res.data.courses || [];
};

const platforms = [
  { value: "google-meet", label: "Google Meet" },
  { value: "zoom", label: "Zoom" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
];

const ScheduleClassModal = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [platform, setPlatform] = useState("google-meet");
  const [classLink, setClassLink] = useState("");
  const [scheduledAt, setScheduledAt] = useState(null);
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("group");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const createMutation = useMutation({
    mutationFn: (payload) => api.post("/api/v1/classes", payload),
    onSuccess: (res) => {
      toast.success(res.data?.message || "Class scheduled successfully");
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
      onClose();
    },
    onError: (err) =>
      setError(err.response?.data?.message || "Could not schedule the class."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!title || !course || !classLink || !scheduledAt) {
      return setError("Title, course, class link and date & time are required.");
    }
    // Only include optional fields when set — empty strings fail the
    // enum/number validators on the server.
    const payload = { title, course, classLink, scheduledAt };
    if (platform) payload.platform = platform;
    if (duration) payload.duration = Number(duration);
    if (type) payload.type = type;
    if (notes.trim()) payload.notes = notes.trim();
    createMutation.mutate(payload);
  };

  const inputClass =
    "bg-[#07071b] border border-gray-700 focus:border-[#c9a84c] text-white p-3 rounded-lg outline-none transition-all duration-300 w-full";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="bg-[#1a1a2e] border border-[#c9a84c]/30 rounded-xl p-6 w-full max-w-md relative my-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            Schedule a <span className="text-[#c9a84c]">Class</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Class title (e.g. Breath Control Basics)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
          />

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className={inputClass}
          >
            {platforms.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <input
            type="url"
            placeholder="Class link (https://...)"
            value={classLink}
            onChange={(e) => setClassLink(e.target.value)}
            required
            className={inputClass}
          />

          <DatePicker
            selected={scheduledAt}
            onChange={(date) => setScheduledAt(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Date & time"
            minDate={new Date()}
            className={inputClass}
          />

          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              placeholder="Duration (min)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={inputClass}
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClass}
            >
              <option value="group">Group</option>
              <option value="private">Private</option>
            </select>
          </div>

          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />

          <button
            type="submit"
            disabled={createMutation.isPending}
            className={`bg-[#c9a84c] hover:bg-[#967f3e] text-[#07071b] font-bold py-3 rounded-lg transition-all duration-300 ${
              createMutation.isPending ? "animate-pulse opacity-70" : ""
            }`}
          >
            {createMutation.isPending ? "Scheduling…" : "Schedule Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleClassModal;
