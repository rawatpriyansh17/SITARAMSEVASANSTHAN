"use client"

import Image from 'next/image'
import { Book, HeartHandshake, Pill, Stethoscope } from 'lucide-react'
import { createRef, useMemo, useRef, type ReactNode } from 'react'
import * as motion from 'motion/react-client'
import {
  delayed,
  reboundDown,
  reboundRight,
} from '@/app/components/motion-presets'
import { Highlighter } from '@/app/components/ui/highlighter'
import { T } from 'gt-next/client'
import { AnimatedBeam } from '@/app/components/animated-beam'
import Carousel, { type CarouselItem } from '@/app/components/Carousel'
import { cn } from '@/lib/utils'

type ServiceItem = {
  id: number
  title: ReactNode
  description: ReactNode
  position: string
  curvature: number
  startAnchor: "top" | "right" | "bottom" | "left"
  endAnchor: "top" | "right" | "bottom" | "left"
  icon: ReactNode
  reverse?: boolean
  variant: typeof reboundRight
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: <T>Breast Cancer Aid</T>,
    description: <T>Free distribution of artificial silicone breasts to women suffering from breast cancer.</T>,
    position: 'left-0 top-6 w-[28rem] max-w-[43%]',
    curvature: 0,
    startAnchor: 'left',
    endAnchor: 'right',
    icon: <HeartHandshake className="size-5" aria-hidden="true" />,
    reverse: true,
    variant: reboundRight,
  },
  {
    id: 2,
    title: <T>Medicine Aid</T>,
    description: <T>Free distribution of medicines given in chemotherapy to breast cancer patients.</T>,
    position: 'right-0 top-6 w-[28rem] max-w-[43%]',
    curvature: 0,
    startAnchor: 'right',
    endAnchor: 'left',
    icon: <Pill className="size-5" aria-hidden="true" />,
    variant: reboundRight,
  },
  {
    id: 3,
    title: <T>Ovarian Care</T>,
    description: <T>Free distribution of medicines given in chemotherapy to women suffering from ovarian cancer.</T>,
    position: 'left-0 top-[16rem] w-[28rem] max-w-[43%]',
    curvature: 0,
    startAnchor: 'left',
    endAnchor: 'right',
    icon:<HeartHandshake className="size-5" aria-hidden="true" />,
    reverse: true,
    variant: reboundRight,
  },
  {
    id: 4,
    title: <T>Pap Smear Test Camps</T>,
    description: <T>Free Pap smear test programs organized to support early detection of cervical cancer.</T>,
    position: 'left-1/2 top-0 w-[24rem] -translate-x-1/2',
    curvature: 0,
    startAnchor: 'top',
    endAnchor: 'bottom',
    icon: <Stethoscope className="size-5" aria-hidden="true" />,
    reverse: true,
    variant: reboundRight,
  },
  {
    id: 5,
    title: <T>Oral Cancer Camps</T>,
    description: <T>Oral cancer camps organized for screening, awareness, and timely guidance.</T>,
    position: 'left-1/2 bottom-0 w-[24rem] -translate-x-1/2',
    curvature: 0,
    startAnchor: 'bottom',
    endAnchor: 'top',
    icon: <Stethoscope className="size-5" aria-hidden="true" />,
    variant: reboundRight,
  },
  {
    id: 6,
    title: <T>Health Camps</T>,
    description: <T>Organizing blood donation & health check-up camps to promote health awareness and well-being.</T>,
    position: 'right-0 top-[16rem] w-[28rem] max-w-[43%]',
    curvature: 0,
    startAnchor: 'right',
    endAnchor: 'left',
    icon: <Stethoscope className="size-5" aria-hidden="true" />,
    variant: reboundRight,
  },
  {
    id: 7,
    title: <T>Student Supplies</T>,
    description: <T>Free distribution of essential supplies to the students studying in government schools.</T>,
    position: 'left-0 bottom-6 w-[28rem] max-w-[43%]',
    curvature: 0,
    startAnchor: 'left',
    endAnchor: 'right',
    icon: <Book  className="size-5" aria-hidden="true" />,
    reverse: true,
    variant: reboundRight,
  },
  {
    id: 8,
    title: <T>Mammography Tests</T>,
    description: <T>Programs organized for free thermal mammography test for breast cancer patients.</T>,
    position: 'right-0 bottom-6 w-[28rem] max-w-[43%]',
    curvature: 0,
    startAnchor: 'right',
    endAnchor: 'left',
    icon: <Stethoscope className="size-5" aria-hidden="true" />,
    variant: reboundRight,
  },
]

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useMemo(
    () => services.map(() => createRef<HTMLDivElement>()),
    []
  )
  const mobileCarouselItems: CarouselItem[] = services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    icon: service.icon,
  }))

  return (
    <section className="py-2">
      <h2 className="text-center">
          <Highlighter
            action="underline"
            animationDuration={950}
            isView
            color="deeppink"
            iterations={2}
            strokeWidth={2.5}
          >
        <motion.span
          variants={reboundDown}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          className="inline-block font-serif text-3xl font-bold text-pink-700 md:text-6xl"
        >
            <T>What We Do ?</T>
        </motion.span>
          </Highlighter>
      </h2>

      <div
        ref={containerRef}
        className="relative mx-auto mt-6 hidden min-h-[620px] w-full max-w-[96rem] overflow-hidden lg:block"
      >
        <motion.div
          ref={centerRef}
          className="absolute left-1/2 top-1/2 z-30 grid size-48 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-pink-400 bg-white p-3 shadow-2xl shadow-pink-700/60 hover:border-pink-600 xl:size-56"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.18 }}
        >
          <Image
            src="/bow.jpg"
            alt="Breast cancer awareness bow"
            width={400}
            height={400}
            sizes="14rem"
            className="size-full rounded-full object-cover"
          />
        </motion.div>

        {services.map((service, index) => (
          <motion.div
            key={service.id}
            ref={serviceRefs[index]}
            className={`absolute z-20 ${service.position}`}
            variants={service.variant}
            {...delayed(0.45 + index * 0.05)}
          >
            <ServiceCard>
              <ServiceCopy title={service.title} description={service.description} />
            </ServiceCard>
          </motion.div>
        ))}

        {services.map((service, index) => (
          <AnimatedBeam
            key={`beam-${service.id}`}
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={serviceRefs[index]}
            curvature={service.curvature}
            reverse={service.reverse}
            pathColor="#FF1D8A"
            pathWidth={3}
            pathOpacity={0.85}
            gradientStartColor="#ec4899"
            gradientStopColor="#0C00F9"
            duration={2.8}
            delay={index * 0.12}
            startAnchor={service.startAnchor}
            endAnchor={service.endAnchor}
          />
        ))}
      </div>

      <div className="mt-6 lg:hidden">
        <motion.div
          className="mx-auto flex w-full justify-center"
          variants={reboundRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.25 }}
        >
          <Carousel
            items={mobileCarouselItems}
            baseWidth={320}
            autoplay
            autoplayDelay={3200}
            pauseOnHover
            loop
            round={false}
            className="max-w-[21.5rem] sm:max-w-[23rem]"
          />
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCopy({ title, description }: { title: ReactNode; description: ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="font-serif text-xl font-black leading-tight text-pink-800 md:text-lg text-shadow-md text-shadow-pink-200">
      
                <Highlighter
            action="underline"
            animationDuration={950}
            isView
            color="deeppink"
            iterations={1}
            strokeWidth={1.5}
          >
         {title}
      </Highlighter>
      </div>
      <div className="font-serif text-sm font-semibold leading-snug text-gray-800 md:text-base  ">
        {description}
      </div>
    </div>
  )
}

function ServiceCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn(
        "relative z-10 rounded-md border-2 border-l-4 border-b-6 border-rose-500 bg-white px-5 py-3 text-center font-serif text-sm font-extrabold leading-snug text-gray-800  transition-transform duration-150 md:text-lg",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}
