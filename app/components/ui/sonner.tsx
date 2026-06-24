"use client"

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast !border-0 !text-white !shadow-[0_14px_36px_rgba(157,23,77,0.28)] !text-shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
          title: "!font-mono !font-bold !text-white !text-sm !md:text-base",
          description: "!font-mono !text-white/85 !text-xs !md:text-sm",
          icon: "!text-white",
          success: "!bg-linear-to-b !from-emerald-700 !via-green-600 !to-lime-500",
          error: "!bg-linear-to-b !from-rose-800 !via-pink-700 !to-red-500",
          info: "!bg-linear-to-b !from-purple-700 !via-purple-600 !to-purple-500",
          warning: "!bg-linear-to-b !from-amber-600 !via-orange-500 !to-rose-500",
          loading: "!bg-linear-to-b !from-pink-900 !via-pink-700 !to-pink-600",
          closeButton: "!border !bg-white/90 !text-pink-900 ",
          actionButton: "!bg-white/20 !text-white hover:!bg-white/30",
          cancelButton: "!bg-white/10 !text-white hover:!bg-white/20",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
