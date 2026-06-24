"use client";

import { useEffect, useMemo, useRef, useState, type JSX, type ReactNode } from "react";
import { motion, type PanInfo, useMotionValue, useTransform } from "motion/react";

import CarouselNavigator from "@/app/components/carousal-navigator";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  title: ReactNode;
  description: ReactNode;
  id: number;
  icon: ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  className?: string;
}

const DRAG_BUFFER = 24;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const CONTAINER_PADDING = 16;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 280, damping: 28 };

interface CarouselCardProps {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  round: boolean;
  trackItemOffset: number;
  x: ReturnType<typeof useMotionValue<number>>;
  transition: typeof SPRING_OPTIONS | { duration: 0 };
}

function CarouselCard({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
}: CarouselCardProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const rotateY = useTransform(x, range, [18, 0, -18], { clamp: false });
  const scale = useTransform(x, range, [0.95, 1, 0.95], { clamp: false });

  return (
    <motion.article
      className={cn(
        "relative shrink-0 overflow-hidden cursor-grab active:cursor-grabbing",
        round
          ? "flex items-center justify-center rounded-full bg-rose-100 text-center"
          : "flex min-h-[160px] flex-col justify-between rounded-[26px] border-2 border-r-4 border-b-4 border-pink-500 bg-white px-4 py-4 sm:min-h-[172px] sm:px-5 sm:py-5"
      )}
      style={{
        width: itemWidth,
        ...(round ? { height: itemWidth } : {}),
        rotateY,
        scale,
      }}
      transition={transition}
    >
      <div className="flex items-center gap-2">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pink-600 to-rose-500 text-white shadow-md sm:size-11">
          {item.icon}
        </span>
        <h3 className="font-serif text-lg font-black leading-tight text-pink-800 sm:text-xl">

          {item.title}
        </h3>
      </div>
      <div className="mt-3 font-serif text-[0.95rem] font-semibold leading-relaxed text-slate-700 sm:mt-4 sm:text-base">
        {item.description}
      </div>
    </motion.article>
  );
}

export default function Carousel({
  items,
  baseWidth = 320,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  className,
}: CarouselProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(baseWidth);
  const [position, setPosition] = useState(loop ? 1 : 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const itemWidth = Math.max(containerWidth - CONTAINER_PADDING * 2, 220);
  const trackItemOffset = itemWidth + GAP;
  const [jumpX, setJumpX] = useState<number | null>(null);
  const targetX = -(position * trackItemOffset);
  const x = useMotionValue(targetX);
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => {
      setContainerWidth(Math.min(baseWidth, node.clientWidth || baseWidth));
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [baseWidth]);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;

    const node = containerRef.current;
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = window.setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, itemsForRender.length, pauseOnHover]);

  const effectiveTransition = isJumping ? { duration: 0 as const } : SPRING_OPTIONS;

  function handleAnimationStart() {
    setIsAnimating(true);
  }

  function handleAnimationComplete() {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }

    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      setJumpX(-(target * trackItemOffset));
      requestAnimationFrame(() => {
        setJumpX(null);
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      setJumpX(-(target * trackItemOffset));
      requestAnimationFrame(() => {
        setJumpX(null);
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  }

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-[28px] border border-r-4 border-b-4 border-pink-300 bg-white/65 px-3 pt-3 pb-2 shadow-lg shadow-pink-950/10 backdrop-blur-sm sm:rounded-[32px] sm:px-4 sm:pt-4",
        className
      )}
      style={{
        maxWidth: `${baseWidth}px`,
        ...(round ? { aspectRatio: "1 / 1" } : {}),
      }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x: jumpX ?? x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: jumpX ?? targetX }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselCard
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className="mt-4 flex w-full justify-center">
        <CarouselNavigator
          totalSlides={items.length}
          currentIndex={activeIndex}
          autoDelay={autoplayDelay}
          loop={loop}
          onIndexChange={(index) => setPosition(loop ? index + 1 : index)}
        />
      </div>
    </div>
  );
}
