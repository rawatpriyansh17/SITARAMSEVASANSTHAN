"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface Highlight2Props {
  children: ReactNode
  className?: string
}

export function Highlight2({ children, className }: Highlight2Props) {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, amount: 0.75 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left 82%",
      }}
      className={cn(
        "inline rounded-lg bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 px-2 pb-1 text-pink-950 [-webkit-box-decoration-break:clone] [box-decoration-break:clone]",
        className,
      )}
    >
      {children}
    </motion.span>
  )
}
