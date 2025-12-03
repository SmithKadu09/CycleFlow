"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Learn = () => {
  const router = useRouter();

  const goToDashboard = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-pink-200 text-gray-800 px-4 py-10 md:px-10 lg:px-20">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">

        {/* BACK BUTTON */}
        <div className="flex justify-center md:justify-end mb-6">
          <button
            onClick={goToDashboard}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition"
          >
            Go to Dashboard
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 text-center">
          Learn How to Use <span className="text-pink-800">Cycleflow</span>
        </h1>

        <p className="mb-8 text-base md:text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-pink-700">Cycleflow</span>, your smart and simple companion to track your menstrual cycle! Whether you’re new to period tracking or just looking for a smoother experience, this guide will help you understand every feature.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
            1. Getting Started
          </h2>

          <p className="font-medium mb-1">Login Options:</p>
          <ul className="list-disc list-inside mb-3 text-sm md:text-base">
            <li>Login using <strong>GitHub</strong> or <strong>Google</strong>.</li>
            <li>New users can sign up instantly using either login method.</li>
          </ul>

          <p className="font-medium mb-1">Redirection Based on Data:</p>
          <ul className="list-disc list-inside text-sm md:text-base">
            <li><strong>Existing User:</strong> Redirected to Dashboard.</li>
            <li><strong>New User:</strong> Sent to Intro Page to set cycle details.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
            2. Intro Page (for New Users)
          </h2>

          <p className="mb-2 text-sm md:text-base">You will answer simple cycle-related questions:</p>
          <ul className="list-disc list-inside mb-3 text-sm md:text-base">
            <li>Period length</li>
            <li>Cycle duration</li>
            <li>Last period start date</li>
          </ul>

          <p className="text-sm md:text-base">
            After this, Cycleflow calculates predictions and takes you to the Dashboard.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
            3. Dashboard Overview
          </h2>

          <p className="mb-3 text-sm md:text-base">
            The Dashboard is where you manage your entire menstrual tracking.
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-pink-500 mt-3 mb-1">
            Log a New Period
          </h3>
          <ul className="list-disc list-inside mb-3 text-sm md:text-base">
            <li>Tap the <span className="font-semibold">“Add Period”</span> button.</li>
            <li>Enter start and end dates.</li>
            <li>Cycleflow updates averages and history automatically.</li>
          </ul>

          <h3 className="text-lg md:text-xl font-semibold text-pink-500 mt-3 mb-1">
            View History
          </h3>
          <p className="mb-3 text-sm md:text-base">See all logged periods and spot patterns easily.</p>

          <h3 className="text-lg md:text-xl font-semibold text-pink-500 mt-3 mb-1">
            See Averages
          </h3>
          <ul className="list-disc list-inside text-sm md:text-base">
            <li><strong>Average cycle length</strong></li>
            <li><strong>Average period duration</strong></li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
            4. Why Use Cycleflow?
          </h2>

          <ul className="list-disc list-inside text-sm md:text-base">
            <li><strong>Simple:</strong> Clean UI, easy to use.</li>
            <li><strong>Personalized:</strong> Learns your cycle patterns.</li>
            <li><strong>Accessible:</strong> Works on all devices.</li>
            <li><strong>Insightful history:</strong> Track past cycles easily.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-3">
            5. Tips for Best Experience
          </h2>

          <ul className="list-disc list-inside text-sm md:text-base">
            <li>Log every period consistently.</li>
            <li>Review your history regularly.</li>
            <li>Update info anytime from Dashboard.</li>
          </ul>
        </section>

        <p className="text-center text-lg font-semibold text-pink-700 mt-10">
          Cycleflow makes period tracking <span className="font-bold">simple, smart, and stress-free</span>.  
          Start logging today and understand your body better!
        </p>

      </div>

    </div>
  );
};

export default Learn;
