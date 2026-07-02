"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  BadgeAlert,
  ChevronDown,
  CircleX,
  MoreHorizontal,
  PencilLine,
  RotateCcw,
  Send,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Streamdown } from "streamdown";
import { T, useLocaleSelector } from "gt-next/client";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/app/components/ui/marker";
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@/app/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/app/components/ui/message-scroller";
import { cn } from "@/lib/utils";

type ChatMessage = ReturnType<typeof useChat>["messages"][number];
type Feedback = "like" | "dislike";

const assistantCopy = {
  en: {
    placeholderIdle: "Ask Sarthi anything",
    placeholderWorking: "Sarthi is replying...",
    quickPrompts: {
      donate: "How can I donate?",
      programs: "Tell me about your programs.",
      contact: "How can I contact the NGO?",
    },
  },
  hi: {
    placeholderIdle: "सार्थी से कुछ भी पूछें",
    placeholderWorking: "सार्थी जवाब दे रहा है...",
    quickPrompts: {
      donate: "मैं दान कैसे कर सकता/सकती हूँ?",
      programs: "मुझे आपके कार्यक्रमों के बारे में बताइए।",
      contact: "मैं NGO से कैसे संपर्क कर सकता/सकती हूँ?",
    },
  },
} as const;

function getAssistantCopy(locale: string) {
  return locale.toLowerCase().startsWith("hi") ? assistantCopy.hi : assistantCopy.en;
}

function isRateLimitError(error: Error | undefined) {
  return Boolean(error?.message.match(/rate[_\s-]?limit|429|many questions|free tier/i));
}

function getMessageText(message: ChatMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function formatRelativeTime(timestamp: number | undefined, now: number) {
  if (!timestamp) return "just now";

  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (seconds < 45) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function ThinkingMessage() {
  return (
    <Message align="start">
      <MessageContent className="items-start">
        <Marker
          role="status"
        >
          <MarkerContent className="sarthi-shimmer text-sm font-extrabold tracking-wide">
           <T>Sarthi is thinking...</T>
          </MarkerContent>
        </Marker>
      </MessageContent>
    </Message>
  );
}

function AssistantMarkdown({
  children,
  isStreaming,
}: {
  children: string;
  isStreaming: boolean;
}) {
  return (
    <Streamdown
      mode={isStreaming ? "streaming" : "static"}
      isAnimating={isStreaming}
      animated={{ animation: "fadeIn", duration: 160, stagger: 0.01 }}
      linkSafety={{
        enabled: false,
      }}
      className="text-[15px] leading-relaxed text-neutral-900 [&_a]:font-semibold [&_a]:text-pink-700 [&_a]:underline [&_a]:underline-offset-4 [&_li]:my-1 [&_ol]:ml-5 [&_p]:my-0 [&_p+*]:mt-3 [&_strong]:font-extrabold [&_ul]:ml-5 [&_ul]:list-disc"
    >
      {children}
    </Streamdown>
  );
}

function ChatBubble({
  message,
  now,
  feedback,
  onFeedback,
  isStreaming,
}: {
  message: ChatMessage;
  now: number;
  feedback?: Feedback;
  onFeedback: (value: Feedback) => void;
  isStreaming: boolean;
}) {
  const [createdAt] = useState(() => Date.now());
  const isUser = message.role === "user";
  const text = getMessageText(message);

  if (!text) return null;

  return (
    <Message align={isUser ? "end" : "start"} className="px-1">
      <MessageContent className={cn(isUser ? "items-end" : "items-start")}>
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={cn(
            "max-w-[86%] rounded-[1.65rem] px-4 py-3 shadow-sm",
            isUser
              ? "rounded-br-md bg-gradient-to-br from-pink-600 to-pink-500 text-white"
              : "rounded-bl-md bg-pink-50 text-neutral-950 ring-1 ring-pink-100"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
              {text}
            </p>
          ) : (
            <AssistantMarkdown isStreaming={isStreaming}>
              {text}
            </AssistantMarkdown>
          )}
        </motion.div>

        <MessageFooter
          className={cn(
            "gap-3 px-1 text-xs text-neutral-500",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          <span>{formatRelativeTime(createdAt, now)}</span>
          {!isUser && (
            <>
              <span className="h-4 w-px bg-neutral-200" aria-hidden="true" />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Like this answer"
                  onClick={() => onFeedback("like")}
                  className={cn(
                    "p-1 text-neutral-500 transition hover:text-pink-700",
                    feedback === "like" && "text-pink-700"
                  )}
                >
                  <ThumbsUp className={cn("size-4", feedback === "like" && "fill-current")} />
                </button>
                <button
                  type="button"
                  aria-label="Dislike this answer"
                  onClick={() => onFeedback("dislike")}
                  className={cn(
                    "p-1 text-neutral-500 transition hover:text-pink-700",
                    feedback === "dislike" && "text-pink-700"
                  )}
                >
                  <ThumbsDown className={cn("size-4", feedback === "dislike" && "fill-current")} />
                </button>
              </div>
            </>
          )}
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}

export function AIAssistant() {
  const { locale } = useLocaleSelector();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmEndOpen, setConfirmEndOpen] = useState(false);
  const [input, setInput] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
    stop,
    setMessages,
    clearError,
  } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isWorking = status === "submitted" || status === "streaming";
  const hasMessages = messages.length > 0;
  const copy = getAssistantCopy(locale);
  const placeholder = isWorking ? copy.placeholderWorking : copy.placeholderIdle;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [input]);

  useEffect(() => {
    if (!open) return;

    const scrollToBottom = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: "smooth",
      });
    };

    const frame = window.requestAnimationFrame(scrollToBottom);
    const timeout = window.setTimeout(scrollToBottom, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [error, messages.length, open, status]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();

    if (!text || isWorking) return;

    clearError();
    sendMessage({ text });
    setInput("");
  }

  function sendQuickPrompt(prompt: string) {
    if (isWorking) return;

    clearError();
    sendMessage({ text: prompt });
    setOpen(true);
  }

  function startNewChat() {
    stop();
    clearError();
    setMessages([]);
    setFeedback({});
    setInput("");
    setMenuOpen(false);
  }

  function endChat() {
    startNewChat();
    setConfirmEndOpen(false);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-4 right-3 z-50 flex flex-col items-end gap-3 [font-family:var(--font-poppins)] sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed inset-x-2 bottom-20 top-2 flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(157,23,77,0.25)] sm:inset-x-auto sm:bottom-24 sm:right-5 sm:top-auto sm:h-[min(48rem,calc(100dvh-7rem))] sm:w-[min(30rem,calc(100vw-2rem))]"
            aria-label="Sarthi AI agent"
          >
            <header className="relative bg-gradient-to-br from-pink-900 via-pink-600 to-pink-800 px-4 py-4 text-white">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full ">
                    <Image
                      src="/chat-header-logo.png"
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-extrabold leading-tight">
                     Sarthi <T>AI Agent</T>
                    </h2>
                  </div>
                </div>

                <div ref={menuRef} className="relative flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setMenuOpen((current) => !current)}
                    className="size-10 rounded-full text-white hover:bg-white/15 hover:text-white cursor-pointer"
                    aria-label="Open assistant menu"
                    aria-expanded={menuOpen}
                  >
                    <MoreHorizontal className="size-10" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="size-10 rounded-full text-white hover:bg-white/15 hover:text-white cursor-pointer"
                    aria-label="Close assistant "
                  >
                    <X className="size-10" />
                  </Button>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.16 }}
                        className="absolute right-9 top-11 z-20 w-56 rounded-2xl border border-pink-100 bg-white p-1 text-pink-950 shadow-xl"
                      >
                        <button
                          type="button"
                          onClick={startNewChat}
                          className="flex w-full items-center gap-3 rounded-xl hover:rounded-b-none px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-pink-50 hover:border hover:border-pink-200 cursor-pointer"
                        >
                          <PencilLine className="size-4 text-pink-600" />
                          <T>Start a new chat</T>
                        </button>
                        <Separator />
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            setConfirmEndOpen(true);
                          }}
                          className="flex w-full items-center gap-3 rounded-xl hover:rounded-t-none px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-pink-50 hover:border hover:border-pink-200 cursor-pointer"
                        >
                          <X className="size-4 text-pink-600" />
                          <T>End chat</T>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </header>

            <AnimatePresence>
              {confirmEndOpen && (
                <motion.div
                  className="absolute inset-0 z-30 flex items-center justify-center bg-pink-950/18 p-6 "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="w-full max-w-sm rounded-3xl border border-pink-100 bg-white/95 p-6 text-center shadow-[0_24px_70px_rgba(157,23,77,0.28)]"
                  >
                    <div className="mx-auto grid size-12 place-items-center rounded-full bg-red-50 text-red-700">
                      <CircleX className="size-7" />
                    </div>
                    <h3 className="mt-4 text-3xl font-extrabold text-red-900">
                      <T>End chat</T>
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-red-800/75">
                      <T>Do you want to end this chat?</T>
                    </p>
                    <div className="mt-6 grid gap-3">
                      <Button
                        type="button"
                        onClick={endChat}
                        className="h-12 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-base font-extrabold text-white hover:bg-gradient-to-r hover:from-red-700 hover:to-red-800 cursor-pointer"
                      >
                       <T>Yes, end chat</T>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setConfirmEndOpen(false)}
                        className="h-12 rounded-2xl border-pink-100 bg-white text-base font-extrabold text-pink-900 hover:bg-pink-50"
                      >
                        <T>Cancel</T>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <MessageScrollerProvider
              autoScroll
              defaultScrollPosition="end"
              scrollMargin={92}
              scrollPreviousItemPeek={8}
            >
              <MessageScroller className="min-h-0 flex-1 bg-white">
                <MessageScrollerViewport ref={viewportRef} className="scroll-pt-24">
                  <MessageScrollerContent className="gap-4 px-4 pb-7 pt-6">
                    {!hasMessages && (
                      <MessageScrollerItem>
                        <div className="space-y-3">
                          <Message align="start">
                            <MessageContent className="items-start">
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-[86%] rounded-[1.65rem] rounded-bl-md bg-pink-50 px-4 py-3 text-[15px] leading-relaxed text-pink-900 border border-pink-300 font-semibold"
                              >
                                <T>Namaste 🙏, I am Sarthi. You can ask me about donations ,
                                programs, events, contact details, or where to
                                find something on the website!</T>
                              </motion.div>
                            </MessageContent>
                          </Message>
                          <div className="flex flex-wrap gap-2 pl-1">
                            <button
                              type="button"
                              onClick={() => sendQuickPrompt(copy.quickPrompts.donate)}
                              className="rounded-full border border-pink-200 bg-white px-3 py-2 text-xs font-semibold text-pink-800 shadow-sm transition hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700"
                            >
                              <span aria-hidden="true">🎗️</span>{" "}
                              <T>How can I donate?</T>
                            </button>
                            <button
                              type="button"
                              onClick={() => sendQuickPrompt(copy.quickPrompts.programs)}
                              className="rounded-full border border-pink-200 bg-white px-3 py-2 text-xs font-semibold text-pink-800 shadow-sm transition hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700"
                            >
                              <span aria-hidden="true">📅</span>{" "}
                              <T>Tell me about your programs.</T>
                            </button>
                            <button
                              type="button"
                              onClick={() => sendQuickPrompt(copy.quickPrompts.contact)}
                              className="rounded-full border border-pink-200 bg-white px-3 py-2 text-xs font-semibold text-pink-800 shadow-sm transition hover:border-pink-400 hover:bg-pink-50 hover:text-pink-700"
                            >
                              <span aria-hidden="true">📞</span>{" "}
                              <T>How can I contact the NGO?</T>
                            </button>
                          </div>
                        </div>
                      </MessageScrollerItem>
                    )}

                    {messages.map((message) => (
                      <MessageScrollerItem key={message.id} messageId={message.id}>
                        <ChatBubble
                          message={message}
                          now={now}
                          feedback={feedback[message.id]}
                          isStreaming={
                            status === "streaming" &&
                            message.id === messages.at(-1)?.id
                          }
                          onFeedback={(value) =>
                            setFeedback((current) => {
                              const next = { ...current };

                              if (next[message.id] === value) {
                                delete next[message.id];
                              } else {
                                next[message.id] = value;
                              }

                              return next;
                            })
                          }
                        />
                      </MessageScrollerItem>
                    ))}

                    {status === "submitted" && (
                      <MessageScrollerItem>
                        <ThinkingMessage />
                      </MessageScrollerItem>
                    )}

                    {error && (
                      <MessageScrollerItem>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-3xl bg-gradient-to-br from-red-500 to-red-700 p-3 text-white shadow-lg"
                        >
                          <Marker className="items-start text-white">
                            <MarkerIcon className="mt-0.5">
                            <BadgeAlert className="size-4 text-white" />
                            </MarkerIcon>
                            <MarkerContent className="space-y-2">
                              <p className="text-sm font-extrabold">
                                {isRateLimitError(error)
                                  ? "Sarthi is taking a short pause."
                                  : "Sarthi could not answer that."}
                              </p>
                              <p className="text-xs font-semibold leading-relaxed text-white/85">
                                {isRateLimitError(error)
                                  ? "Too many requests are being made. Please wait a moment and try again."
                                  : "Please try again in a moment."}
                              </p>
                              <button
                                type="button"
                                onClick={() => regenerate()}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-pink-700 shadow-sm transition hover:bg-pink-50"
                              >
                                <RotateCcw className="size-3.5" />
                                <T>Try again</T>
                              </button>
                            </MarkerContent>
                          </Marker>
                        </motion.div>
                      </MessageScrollerItem>
                    )}

                    <MessageScrollerItem scrollAnchor>
                      <div ref={scrollAnchorRef} className="h-1" />
                    </MessageScrollerItem>
                  </MessageScrollerContent>
                </MessageScrollerViewport>
                <MessageScrollerButton className="bottom-4 bg-white text-pink-700 shadow-lg cursor-pointer hoover:bg-pink-50 hover:text-pink-800">
                  <ChevronDown className="size-5 font-bold" strokeWidth={3} />
                  <span className="sr-only"><T>Scroll to latest message</T></span>
                </MessageScrollerButton>
              </MessageScroller>
            </MessageScrollerProvider>

            <form
              onSubmit={submitMessage}
              className="border-t border-neutral-100 bg-white px-4 pb-4 pt-3"
            >
              <div className="flex min-h-14 items-end gap-2 rounded-[1.75rem] border-2 border-pink-200 bg-white p-2 shadow-[0_12px_30px_rgba(157,23,77,0.1)] focus-within:border-pink-500">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  disabled={isWorking}
                  rows={1}
                  maxLength={1000}
                  placeholder={placeholder}
                  className="min-h-10 flex-1 resize-none overflow-hidden bg-transparent px-3 py-2 text-base leading-6 text-neutral-950 outline-none placeholder:text-neutral-400 disabled:opacity-60"
                />
                <Button
                  type={isWorking ? "button" : "submit"}
                  onClick={isWorking ? stop : undefined}
                  size="icon"
                  className="size-10 shrink-0 rounded-full bg-gradient-to-br from-pink-600 to-pink-700 text-white hover:from-pink-700 hover:to-pink-800"
                  aria-label={isWorking ? "Stop assistant" : "Send message"}
                >
                  {isWorking ? <X className="size-4" /> : <Send className="size-4" />}
                </Button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative grid size-16 place-items-center overflow-hidden rounded-full bg-white shadow-[0_18px_46px_rgba(15,23,42,0.25)]  transition hover:scale-105 cursor-pointer"
        whileTap={{ scale: 0.94 }}
        aria-label={open ? "Close Sarthi assistant" : "Open Sarthi assistant"}
      >
        {open ? (
          <span className="grid size-full place-items-center bg-radial from-pink-500 from-30% to-pink-900 text-white">
            <ChevronDown className="size-8" aria-hidden="true" strokeWidth={3} />
          </span>
        ) : (
          <Image
            src="/logo-chat.png"
            alt=""
            fill
            sizes="90px"
            className="object-cover"
          />
        )}
      </motion.button>
    </div>
  );
}
