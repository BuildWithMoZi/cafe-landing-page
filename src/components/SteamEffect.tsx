import { motion } from "framer-motion";

export function SteamEffect() {
  return (
    <div className="pointer-events-none absolute -top-8 left-1/2 flex -translate-x-1/2 gap-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-16 w-3 rounded-full bg-gradient-to-t from-cream/20 to-transparent blur-sm"
          animate={{
            y: [-10, -40],
            opacity: [0, 0.5, 0],
            scaleX: [1, 1.5, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
