"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>You are not logged in.</p>;

  const goToDashboard = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-pink-200 text-gray-800 px-4 py-10 md:px-10 lg:px-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">

        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 text-center">
          Your Profile
        </h1>

        {/* PROFILE PICTURE */}
        <div className="flex justify-center mb-6">
          <Image
            src={session.user.image}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full shadow-lg border-4 border-pink-400"
          />
        </div>

        <div className="space-y-6 text-center md:text-left">

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-1">
              Name:
            </h2>
            <p className="text-gray-700 text-lg">{session.user.name}</p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-1">
              Email:
            </h2>
            <p className="text-gray-700 text-lg">{session.user.email}</p>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={goToDashboard}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 transition"
            >
              Go to Dashboard
            </button>
          </div>

        </div>

      </div>

      <footer>
        <p className="text-center text-gray-600 mt-10 px-4">
          &copy; {new Date().getFullYear()} CycleFlow. All rights reserved. Follow us on{" "}
          <a
            href="https://www.instagram.com/smith_kadu09?igsh=ODV4cGJ5a3oyazEy"
            className="text-pink-600 hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/smith-kadu-96a29b334?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            className="text-pink-600 mx-2 hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Profile;
