
"use client";
import { CalendarDays, Clock, User, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardUI() {
  const { status, data: session } = useSession();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const router = useRouter();

  // Redirect client-side when unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handlelearn = () => router.push("/learn");
  const handleProfile = () => router.push("/profile");

  const handleSubmit = async () => {
    const res = await fetch("/api/save-period", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startDate, endDate }),
    });

    await res.json();
    setReload((prev) => !prev);
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/dashboard-data", { cache: "no-store" });
        const json = await res.json();
        if (res.ok) setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [reload]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f1d4df] flex flex-col items-center px-3 py-2">
      <nav className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="./water.gif" alt="" width={45} height={40} />
          <h1 className="text-3xl font-bold text-[#333]">CycleFlow</h1>
        </div>

        <div className="sm:w-auto w-full text-center">
          <span className="bg-pink-100 text-xl sm:text-2xl text-pink-700 font-semibold px-4 py-2 rounded-xl shadow-md">
            Welcome {session?.user?.name ? session.user.name.slice(0, 15) : "User"}!
          </span>
        </div>

        <div className="w-full sm:w-60 p-3 rounded-full bg-pink-100 font-semibold flex items-center justify-center gap-6">
          <button className="cursor-pointer" onClick={handlelearn}>learn</button>
          <button onClick={handleProfile} className="flex cursor-pointer items-center gap-1">
            profile <User className="text-red-600" size={20} />
          </button>
        </div>
      </nav>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-6">
        {/* LEFT CARD */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="text-red-600" size={22} />
            <h2 className="text-[#444] font-semibold text-lg sm:text-xl">
              Your Next Cycle Estimate
            </h2>
          </div>

          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 break-words leading-tight">
            {data ? new Date(data.nextPeriod).toLocaleDateString() : "Loading..."}
          </p>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Fertility window opening soon!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-gray-700 text-sm">
            <div>
              <p className="font-semibold">AVG Cycle</p>
              <p className="text-gray-500">
                {data ? `${data.avgCycle} days` : "Loading..."}
              </p>
            </div>
            <div>
              <p className="font-semibold">AVG Period</p>
              <p className="text-gray-500">
                {data ? `${data.avgPeriod} days` : "Loading..."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="w-full">
              <span className="text-sm">*period start</span>
              <input
                type="date"
                className="border p-3 rounded-lg w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="w-full">
              <span className="text-sm">*period end</span>
              <input
                type="date"
                className="border p-3 rounded-lg w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button
            className="mt-6 bg-red-500 w-full sm:w-auto text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            onClick={handleSubmit}
          >
            Save New Period
          </button>

          {/* Bar Chart */}
          <div className="mt-6">
            <h3 className="text-gray-700 font-semibold flex items-center gap-2 mb-3">
              <Clock className="text-red-600" size={20} /> Cycle Length Chart
            </h3>

            <div className="h-40 flex items-end gap-3 border-b pb-2 overflow-x-auto">
              {data?.history?.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    style={{ height: `${v.cycleLength * 3}px` }}
                    className="w-8 bg-red-300 rounded hover:bg-red-400 transition"
                  />
                  <p className="text-xs mt-1 text-gray-600">{v.cycleLength}d</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-center text-gray-500 mt-3">
            Average: {data ? `${data.avgCycle} days` : "Loading..."}
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <img src="./clock.gif" alt="" width={30} height={30} />
            <h2 className="text-[#444] font-semibold text-lg">Recent History</h2>
          </div>

          <div className="space-y-4">
            {data?.history?.length > 0 ? (
              data.history.map((h, i) => {
                const start = formatDate(h.startDate);
                const end = formatDate(h.endDate);

                return (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-500 mt-1" />
                    <div className="text-gray-800 text-sm">
                      <div className="font-medium">
                        {start} – {end}
                      </div>
                      <div className="text-gray-500 text-xs">{h.cycleLength} days</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">No history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
