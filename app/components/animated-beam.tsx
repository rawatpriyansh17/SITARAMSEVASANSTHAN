"use client"

import { useEffect, useId, useState, type RefObject } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

type BeamAnchor = "center" | "top" | "right" | "bottom" | "left"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null> // Container ref
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  repeat?: number
  repeatDelay?: number
  startAnchor?: BeamAnchor
  endAnchor?: BeamAnchor
  startAnchorPosition?: number
  endAnchorPosition?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

function getAnchorPoint(
  rect: DOMRect,
  containerRect: DOMRect,
  anchor: BeamAnchor,
  anchorPosition: number,
  xOffset: number,
  yOffset: number
) {
  const edgePosition = Math.min(Math.max(anchorPosition, 0), 1)
  const anchorX = {
    left: rect.left,
    center: rect.left + rect.width / 2,
    right: rect.right,
    top: rect.left + rect.width * edgePosition,
    bottom: rect.left + rect.width * edgePosition,
  }[anchor]

  const anchorY = {
    top: rect.top,
    center: rect.top + rect.height / 2,
    bottom: rect.bottom,
    left: rect.top + rect.height * edgePosition,
    right: rect.top + rect.height * edgePosition,
  }[anchor]

  return {
    x: anchorX - containerRect.left + xOffset,
    y: anchorY - containerRect.top + yOffset,
  }
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  repeat = Infinity,
  repeatDelay = 0,
  startAnchor = "center",
  endAnchor = "center",
  startAnchorPosition = 0.5,
  endAnchorPosition = 0.5,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  useEffect(() => {
    let frameId = 0
    let trackingFrameId = 0
    let remainingTrackingFrames = 120
    let lastPathD = ""
    let lastWidth = 0
    let lastHeight = 0

    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height

        const start = getAnchorPoint(
          rectA,
          containerRect,
          startAnchor,
          startAnchorPosition,
          startXOffset,
          startYOffset
        )
        const end = getAnchorPoint(
          rectB,
          containerRect,
          endAnchor,
          endAnchorPosition,
          endXOffset,
          endYOffset
        )

        const controlY = start.y - curvature
        const d = `M ${start.x},${start.y} Q ${
          (start.x + end.x) / 2
        },${controlY} ${end.x},${end.y}`

        if (svgWidth !== lastWidth || svgHeight !== lastHeight) {
          lastWidth = svgWidth
          lastHeight = svgHeight
          setSvgDimensions({ width: svgWidth, height: svgHeight })
        }
        if (d !== lastPathD) {
          lastPathD = d
          setPathD(d)
        }
      }
    }

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(updatePath)
    }

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      scheduleUpdate()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    if (fromRef.current) {
      resizeObserver.observe(fromRef.current)
    }
    if (toRef.current) {
      resizeObserver.observe(toRef.current)
    }

    const mutationObserver = new MutationObserver(scheduleUpdate)
    if (fromRef.current) {
      mutationObserver.observe(fromRef.current, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      })
    }
    if (toRef.current) {
      mutationObserver.observe(toRef.current, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      })
    }

    const trackAnimatedLayout = () => {
      updatePath()
      remainingTrackingFrames -= 1
      if (remainingTrackingFrames > 0) {
        trackingFrameId = window.requestAnimationFrame(trackAnimatedLayout)
      }
    }

    // Call the updatePath initially to set the initial path
    scheduleUpdate()
    trackingFrameId = window.requestAnimationFrame(trackAnimatedLayout)
    document.fonts?.ready.then(scheduleUpdate).catch(() => {})
    window.addEventListener("resize", scheduleUpdate)

    // Clean up the observer on component unmount
    return () => {
      window.cancelAnimationFrame(frameId)
      window.cancelAnimationFrame(trackingFrameId)
      window.removeEventListener("resize", scheduleUpdate)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startAnchor,
    endAnchor,
    startAnchorPosition,
    endAnchorPosition,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat,
            repeatDelay,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
