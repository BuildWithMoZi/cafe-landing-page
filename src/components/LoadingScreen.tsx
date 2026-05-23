import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/BrandLogo";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return Math.min(p + Math.random() * 15 + 5, 100);
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-dark"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8"
          >
            <BrandLogo variant="loader" className="mx-auto" />
          </motion.div>
          <motion.div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-cta-gradient"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </motion.div>
          <span className="mt-4 font-heading text-xs text-beige">
            Brewing experience… {Math.min(Math.round(progress), 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
