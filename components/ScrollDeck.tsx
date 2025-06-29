'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useBackgroundColor } from '@/components/MotionBgProvider'

function ScrollSection({
  children,
  backgroundColor,
  enableMotion,
}: {
  children: React.ReactNode
  backgroundColor?: string
  enableMotion: boolean
}) {
  const ref = useRef(null)
  const setBg = useBackgroundColor()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const inView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (inView && backgroundColor) {
      setBg(backgroundColor)
    }
  }, [inView, backgroundColor, setBg])

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])

  return (
    <section
      ref={ref}
      className={`${
        enableMotion ? 'h-screen snap-start' : ''
      } flex items-center justify-center overflow-hidden`}
    >
      {enableMotion ? (
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
      ) : (
        <div className="w-full py-16">{children}</div>
      )}
    </section>
  )
}

export default function ScrollFreeze({
  children,
  backgroundColor,
}: {
  children: React.ReactNode
  backgroundColor?: string
}) {
  const [enableMotion, setEnableMotion] = useState(true)

  useEffect(() => {
    const check = () => setEnableMotion(window.innerWidth >= 1500)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className={`relative ${enableMotion ? 'h-[170vh]' : ''}`}>
      <div className={`${enableMotion ? 'sticky top-0 h-screen' : ''} flex items-center justify-center`}>
        <ScrollSection backgroundColor={backgroundColor} enableMotion={enableMotion}>
          {children}
        </ScrollSection>
      </div>
    </div>
  )
}
