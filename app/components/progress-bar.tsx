"use client";

import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  m,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MouseEvent,
  ComponentProps,
  ReactNode,
  createContext,
  startTransition,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

const ProgressBarContext = createContext<ReturnType<typeof useProgress> | null>(
  null
);

export function useProgressBar() {
  const progress = use(ProgressBarContext);

  if (progress === null) {
    throw new Error("Need to be inside provider");
  }

  return progress;
}

export function ProgressBar({ className, children }: { className: string, children: ReactNode }) {
  const progress = useProgress();
  const width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence onExitComplete={progress.reset}>
          {(progress.state === "in-progress" || progress.state === "completing") && (
            <m.div
              style={{ width }}
              exit={{ opacity: 0 }}
              className={className}
            />
          )}
        </AnimatePresence>
      </LazyMotion>

      {children}
    </ProgressBarContext.Provider>
  );
}

export function ProgressBarLink({
  href,
  children,
  onClick,
  ...rest
}: ComponentProps<typeof Link>) {
  const progress = useProgressBar();
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const isModifiedClick =
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (isModifiedClick) return;

    const hrefValue = href.toString();
    const targetUrl = new URL(hrefValue, window.location.href);
    const isExternal = targetUrl.origin !== window.location.origin;
    if (isExternal) return;

    const isSamePageHash =
      targetUrl.hash.length > 0 &&
      targetUrl.pathname === window.location.pathname &&
      targetUrl.search === window.location.search;

    if (isSamePageHash) {
      e.preventDefault();

      const targetId = decodeURIComponent(targetUrl.hash.slice(1));
      const targetElement = document.getElementById(targetId);

      window.history.pushState(null, "", targetUrl.hash);
      targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
      progress.done();
      return;
    }

    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (hrefValue === currentUrl) {
      progress.done();
      return;
    }

    e.preventDefault();
    progress.start();

    startTransition(() => {
      const hasHashTarget = targetUrl.hash.length > 0;

      router.push(hrefValue, { scroll: !hasHashTarget });
      if (!hasHashTarget && typeof window !== "undefined") {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
      }
      progress.done();
    });
  }

  return (
    <Link
      href={href}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

function useProgress() {
  const [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");

  const value = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1,
  });

  useInterval(
    () => {
      // If we start progress but the bar is currently complete, reset it first.
      if (value.get() === 100) {
        value.jump(0);
      }

      const current = value.get();

      let diff;
      if (current === 0) {
        diff = 15;
      } else if (current < 50) {
        diff = rand(1, 10);
      } else {
        diff = rand(1, 5);
      }

      value.set(Math.min(current + diff, 99));
    },
    state === "in-progress" ? 750 : null
  );

  useEffect(() => {
    const unsubscribe = value.on("change", (latest) => {
      if (latest === 100) {
        setState("complete");
      }
    });

    return () => unsubscribe();
  }, [value]);

  useEffect(() => {
    if (state === "initial") {
      value.jump(0);
    } else if (state === "completing") {
      value.set(100);
    }
  }, [value, state]);

  function reset() {
    setState("initial");
  }

  function start() {
    setState("in-progress");
  }

  function done() {
    setState((state) =>
      state === "initial" || state === "in-progress" ? "completing" : state
    );
  }

  return { state, value, start, done, reset };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      tick();

      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
