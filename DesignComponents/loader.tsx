"use client";
import { easeInOut, motion } from "framer-motion";

export function LoadingTabSkeleton({ data }: { data: string }) {
  return (
    <motion.div animate={{
      opacity: [0.3, 1, 0.3]
    }} transition={{
      duration: 0.5,
      repeat: Infinity,
      ease: easeInOut,
    }} className="w-full min-h-screen text-xl font-manrope flex items-center justify-center text-black dark:text-white">
      Fetching {data}...
    </motion.div>
  );
}