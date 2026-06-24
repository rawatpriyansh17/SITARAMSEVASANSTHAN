"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC } from "react";

type ThemeConfig = {
  backgroundColor: string;
  buttonColor: string;
  dotColor: string;
  progressColor: string;
};

interface CarouselNavigatorProps {
  totalSlides?: number;
  autoDelay?: number;
  themes?: ThemeConfig[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  loop?: boolean;
}

const DEFAULT_TOTAL_SLIDES = 4;
const DEFAULT_AUTO_DELAY = 5000;

const DEFAULT_THEMES: ThemeConfig[] = [
  {
    backgroundColor: "rgba(255, 248, 252, 0.96)",
    buttonColor: "#db2777",
    dotColor: "#f9a8d4",
    progressColor: "#fbcfe8",
  },
  {
    backgroundColor: "rgba(253, 242, 248, 0.96)",
    buttonColor: "#be185d",
    dotColor: "#f9a8d4",
    progressColor: "#fbcfe8",
  }
];

const CarouselNavigator: FC<CarouselNavigatorProps> = ({
  totalSlides = DEFAULT_TOTAL_SLIDES,
  autoDelay = DEFAULT_AUTO_DELAY,
  themes = DEFAULT_THEMES,
  currentIndex,
  onIndexChange,
  loop = false,
}) => {
  const theme = themes[currentIndex % themes.length] ?? DEFAULT_THEMES[0];

  const goPrev = () => {
    if (!loop && currentIndex === 0) return;
    onIndexChange((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const goNext = () => {
    if (!loop && currentIndex === totalSlides - 1) return;
    onIndexChange((currentIndex + 1) % totalSlides);
  };

  return (
    <motion.div
      animate={{ backgroundColor: theme.backgroundColor }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center justify-center gap-1 rounded-full px-2 py-1.5 shadow-sm"
    >
      <ArrowButton
        onClick={goPrev}
        buttonColor={theme.buttonColor}
        disabled={!loop && currentIndex === 0}
      >
        <ChevronLeft size={24} strokeWidth={3} />
      </ArrowButton>

      <div className="flex items-center gap-2 px-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <Indicator
            key={index}
            isActive={index === currentIndex}
            theme={theme}
            autoDelay={autoDelay}
            onClick={() => onIndexChange(index)}
          />
        ))}
      </div>

      <ArrowButton
        onClick={goNext}
        buttonColor={theme.buttonColor}
        disabled={!loop && currentIndex === totalSlides - 1}
      >
        <ChevronRight size={24} strokeWidth={3} />
      </ArrowButton>
    </motion.div>
  );
};

function ArrowButton({
  children,
  onClick,
  buttonColor,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  buttonColor: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      disabled={disabled}
      style={{ backgroundColor: disabled ? "#d1d5db" : buttonColor }}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white shadow-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
    >
      {children}
    </motion.button>
  );
}

function Indicator({
  isActive,
  theme,
  autoDelay,
  onClick,
}: {
  isActive: boolean;
  theme: ThemeConfig;
  autoDelay: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        borderRadius: 24,
        backgroundColor: isActive ? theme.progressColor : theme.dotColor,
      }}
      className="relative h-3 cursor-pointer focus:outline-none"
      animate={{ width: isActive ? 48 : 12 }}
    >
      {isActive && (
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoDelay / 1000, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        />
      )}
    </motion.button>
  );
}

export default CarouselNavigator;
