"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useState } from "react";

const BackgroundColorContext = createContext<(color: string) => void>(() => {});

export function MotionBgProvider({ children }: { children: React.ReactNode }) {
  const [bgColor, setBgColor] = useState("#1B201F");

  return (
    <BackgroundColorContext.Provider value={setBgColor}>
      <motion.div
        animate={{ backgroundColor: bgColor }}
        transition={{ duration: 0.6 }}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </BackgroundColorContext.Provider>
  );
}

export function useBackgroundColor() {
  return useContext(BackgroundColorContext);
}
