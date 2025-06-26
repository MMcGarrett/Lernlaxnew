import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -200]);

  return (
    <section
      ref={ref}
      className="h-screen snap-start flex items-center justify-center"
    >
      <motion.div
        style={{
          opacity,
          scaleX,
          scaleY,
          y,
        }}
        className="w-screen h-screen"
      >
        {children}
      </motion.div>
    </section>
  );
}
