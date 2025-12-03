"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const handleSubmit = async () => {
    if (!startDate || !endDate || !cycleLength) {
      alert("Please fill all the fields");
      return;
    }

    const res = await fetch("/api/save-intro-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        cycleLength,
      }),
    });

    const data = await res.json();
    console.log("API Response:", data);

    if (res.ok) router.push("/");
  };

  return (
    <>
      <div className="bg-[#f4cbd3] min-h-screen w-full">
        {/* HEADER */}
        <div className="w-full h-[7vh] bg-[#f77b94] flex items-center justify-center gap-3 text-white">
          <img src="./water.gif" alt="" width={40} height={40} />
          <span className="text-2xl text-red-900 font-bold">CycleFlow</span>
          <span className="text-md text-red-900 mx-3 hidden sm:block">
            A platform where you can predict your next period date
          </span>
        </div>

       

        {/* MAIN BOX */}
        <div className="flex items-center justify-center">
          <div className="w-[85vw] max-w-[600px] bg-white my-5 rounded-2xl flex flex-col items-center gap-3 py-6 shadow-md">

            <img
              className="mx-auto"
              src="./calender.png"
              alt="calender"
              width={100}
              height={150}
            />

            {/* TITLE INSIDE BOX */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <img src="./flower.gif" alt="" width={45} height={45} />
              <span className="text-3xl font-semibold">Let's get started!</span>
            </div>

            <div className="flex flex-col text-lg text-gray-700 items-center mt-2 text-center">
              <span>To give you the most accurate predictions,</span>
              <span>please tell us about your last period</span>
            </div>

            {/* INPUTS */}
            <div className="flex flex-col gap-6 mt-4 w-full items-center">

              <div className="flex flex-col w-[70%]">
                <span className="text-gray-600 text-sm mb-1">
                  *Last period start date
                </span>
                <input
                  className="border-2 h-10 px-3 rounded-xl border-amber-400"
                  placeholder="Last Period Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-[70%]">
                <span className="text-gray-600 text-sm mb-1">
                  *Last period end date
                </span>
                <input
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border-2 h-10 px-3 rounded-xl border-amber-400"
                  placeholder="Last Period End Date"
                  type="date"
                />
              </div>

              <div className="flex flex-col w-[70%]">
                <span className="text-gray-600 text-sm mb-1">
                  *Average days between periods
                </span>
                <input
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="border-2 h-10 px-3 rounded-xl border-amber-400"
                  placeholder="Average Cycle Length"
                  type="number"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-[60%] h-12 rounded-xl text-white bg-[#f66782] hover:bg-[#e35773] text-lg shadow-sm transition"
              >
                Continue to Dashboard
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
