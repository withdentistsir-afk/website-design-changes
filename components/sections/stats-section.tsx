"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { stats } from "@/lib/data"

function Counter({ target, inView }: { target: string; inView: boolean }) {
  const [display, setDisplay] = useState("۰")

  useEffect(() => {
    if (!inView) return
    // Just animate to the final value
    const timer = setTimeout(() => setDisplay(target), 100)
    return () => clearTimeout(timer)
  }, [inView, target])

  return <span>{display}</span>
}

export function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-24 bg-card border-y border-border">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5, type: "spring" }}
                className="text-4xl sm:text-5xl font-black text-foreground mb-2"
              >
                <Counter target={stat.value} inView={inView} />
              </motion.div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
