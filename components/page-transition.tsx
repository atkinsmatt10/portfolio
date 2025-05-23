"use client"

import { motion } from "motion/react"
import type React from "react"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 30 
      }}
      animate={{ 
        opacity: 1, 
        y: 0 
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
        staggerChildren: 0.1
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual section animations for more granular control
export function AnimatedSection({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 