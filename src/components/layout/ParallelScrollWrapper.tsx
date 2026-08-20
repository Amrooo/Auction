"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallelScrollWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // We can apply different scroll speeds to different children if we map over them,
  // or simply apply a smooth parallax to the whole container's inner items.
  // For a simple and clean parallel scroll effect on sections:
  const childrenArray = React.Children.toArray(children)

  return (
    <div ref={containerRef} className="relative">
      {childrenArray.map((child, index) => {
        // Calculate a slight parallax offset for each section based on its index
        // The first section (Hero) stays relatively static, subsequent sections move slightly faster
        const yOffset = useTransform(
          scrollYProgress,
          [0, 1],
          [0, -50 * (index % 3)] // Creates a staggered parallel scrolling effect
        )

        return (
          <motion.div
            key={index}
            style={{ y: index === 0 ? 0 : yOffset }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
