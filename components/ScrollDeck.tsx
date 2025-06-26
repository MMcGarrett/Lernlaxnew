import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useBackgroundColor } from "@/components/MotionBgProvider";


function ScrollSection({   
    children,
    backgroundColor,
  } : {
    children: React.ReactNode;
    backgroundColor?: string;
  }) 
  {
  const ref = useRef(null);
  const setBg = useBackgroundColor();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const inView = useInView(ref, { amount: 0.5 }); // 50% im Viewport

  useEffect(() => {
    if (inView && backgroundColor) {
      setBg(backgroundColor);
    }
  }, [inView, backgroundColor, setBg]);


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

export default function ScrollFreeze({ 
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}) {
  return (
    <div className="h-[150vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <ScrollSection backgroundColor={backgroundColor}>
          {children}
        </ScrollSection>
      </div>
    </div>
  );
}
