"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  totalPages?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (page: number) => void;
}

const digitVariants = {
  initial: (dir: number) => ({
    y: dir > 0 ? 20 : -20,
    opacity: 0,
    scale: 0.5,
    filter: "blur(2px)",
  }),
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -20 : 20,
    opacity: 0,
    scale: 0.5,
    filter: "blur(2px)",
  }),
};

export function Pagination({
  totalPages = 15,
  value,
  defaultValue = 1,
  onChange,
}: PaginationProps) {
  const isControlled = value !== undefined;

  const [internalPage, setInternalPage] = React.useState(defaultValue);
  const [direction, setDirection] = React.useState(0);

  const currentPage = isControlled ? value! : internalPage;

  const digits = currentPage.toString().split("");

  const paginate = (dir: number) => {
    const next = Math.min(totalPages, Math.max(1, currentPage + dir));

    if (next === currentPage) return;

    setDirection(dir);

    if (!isControlled) {
      setInternalPage(next);
    }

    onChange?.(next);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/95 px-1.5 py-1.5 shadow-md shadow-pink-950/15 sm:gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(-1)}
          disabled={currentPage === 1}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-pink-700 text-white shadow-sm transition-colors duration-200 hover:bg-pink-800 sm:h-11 sm:w-11 ${currentPage === 1
              ? "cursor-not-allowed bg-pink-200 text-pink-400 hover:bg-pink-200"
              : "cursor-pointer"
            }`}
        >
          <ChevronLeft className="size-5 sm:size-6" aria-hidden="true" />
        </motion.button>

        <div className="mr-1 flex items-center pr-1 font-mono text-sm font-extrabold text-pink-800 select-none sm:text-base">
          <div className="flex h-7 items-center justify-center sm:h-8">
            {digits.map((digit, index) => (
              <div
                key={index}
                className="relative h-7 overflow-hidden w-[1ch]"
              >
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.span
                    key={`${currentPage}-${index}`}
                    custom={direction}
                    variants={digitVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 16,
                      mass: 1.2,
                    }}
                    className="absolute inset-0 flex items-center justify-center text-pink-800 tabular-nums"
                  >
                    {digit}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>

          <span className="ml-1 flex h-7 items-center text-pink-600 sm:h-8">
            of {totalPages}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={() => paginate(1)}
          disabled={currentPage === totalPages}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-pink-700 text-white shadow-sm transition-colors duration-200 hover:bg-pink-800 sm:h-11 sm:w-11 ${currentPage === totalPages
              ? "cursor-not-allowed bg-pink-200 text-pink-400 hover:bg-pink-200"
              : "cursor-pointer"
            }`}
        >
          <ChevronRight className="size-5 sm:size-6" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}
