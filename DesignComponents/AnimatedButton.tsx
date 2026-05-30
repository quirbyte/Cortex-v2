import { motion } from "framer-motion";

type AnimatedButtonProps = {
  text: string;
  className?: string;
  initialBg: string;
  initialText: string;
  finalBg: string;
  finalText: string;
};

export default function AnimatedButton({
  text,
  className,
  initialBg,
  initialText,
  finalBg,
  finalText,
}: AnimatedButtonProps) {
  const bgVariants = {
    initial: { y: "100%" },
    hover: { y: "0%" },
  };

  const textVariants = {
    initial: { color: initialText },
    hover: { color: finalText },
  };

  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-2 rounded-full font-semibold cursor-pointer transition-all ${className}`}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ backgroundColor: initialBg }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: finalBg }}
        variants={bgVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.span
        className="relative z-10 tracking-wide"
        variants={textVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {text}
      </motion.span>
    </motion.button>
  );
}
