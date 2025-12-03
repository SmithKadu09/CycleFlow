"use client";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/check-user", {
        headers: {
          "user-email": session.user.email,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.exists) router.push("/");
          else router.push("/intro");
        });
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-pink-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          bg-white rounded-3xl shadow-xl 
          w-full max-w-lg 
          p-6 sm:p-10 
          text-center 
          border border-pink-200 
          flex flex-col justify-center
        "
      >
        {/* TITLE */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="
            text-3xl sm:text-4xl 
            font-bold text-pink-600 mb-4 
            flex items-center justify-center gap-2
          "
        >
          🌸 CycleFlow
        </motion.h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg px-2">
          Track your cycle with ease 💖. CycleFlow predicts your next period and
          lets you record your history 📅 so you can understand your body better
          every month.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col gap-4 w-full">
          <motion.button
            onClick={() => signIn("github")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-3 
              rounded-lg 
              bg-gray-800 hover:bg-black 
              text-white font-semibold 
              transition 
              flex items-center justify-center gap-3
              text-base sm:text-lg
            "
          >
            <FaGithub size={22} /> Login with GitHub
          </motion.button>

          <motion.button
            onClick={() => signIn("google")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-3 
              rounded-lg 
              bg-white border border-gray-300 
              hover:bg-gray-100 
              text-gray-700 font-semibold 
              transition 
              flex items-center justify-center gap-3
              text-base sm:text-lg
            "
          >
            <FcGoogle size={24} /> Login with Google
          </motion.button>
        </div>

        {/* FOOTER TEXT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 sm:mt-10 text-pink-500 text-lg sm:text-xl"
        >
          ✨ Stay organized. Stay confident. ✨
        </motion.div>
      </motion.div>
    </div>
  );
}
