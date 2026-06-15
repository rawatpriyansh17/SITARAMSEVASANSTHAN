import Image from 'next/image'
import * as motion from 'motion/react-client'
import {
  delayed,
  reboundRight,
} from '@/app/components/motion-presets'
import { Highlighter } from '@/app/components/ui/highlighter'
const services = [
  {
    text: '⭐ Free distribution of artificial silicone breasts to women suffering from breast cancer.',
    position: 'left-0 top-6 w-[27rem] max-w-[42%]',
    line: { x1: 455, y1: 236, x2: 226, y2: 118 },
    variant: reboundRight,
  },
  {
    text: '⭐ Free distribution of medicines given in chemotherapy to women breast cancer patients.',
    position: 'right-0 top-6 w-[27rem] max-w-[42%]',
    line: { x1: 545, y1: 236, x2: 774, y2: 118 },
    variant: reboundRight,
  },
  {
    text: '⭐ Free distribution of medicines given in chemotherapy to women suffering from ovarian cancer.',
    position: 'left-0 top-[15rem] w-[27rem] max-w-[42%]',
    line: { x1: 460, y1: 280, x2: 226, y2: 280 },
    variant: reboundRight,
  },
  {
    text: '⭐ Free Pap smear test programs organized to support early detection of cervical cancer.',
    position: 'left-1/2 top-[1.5rem] w-[20rem] -translate-x-1/2',
    line: { x1: 500, y1: 200, x2: 500, y2: 150 },
    variant: reboundRight,
  },
  {
    text: '⭐ Oral cancer camps organized for screening, awareness, and timely guidance.',
    position: 'left-1/2 bottom-[1.5rem] w-[20rem] -translate-x-1/2',
    line: { x1: 500, y1: 360, x2: 500, y2: 410 },
    variant: reboundRight,
  },
  {
    text: '⭐ Organizing  blood donation & health check-up camps.',
    position: 'right-0 top-[15rem] w-[27rem] max-w-[42%]',
    line: { x1: 540, y1: 280, x2: 774, y2: 280 },
    variant: reboundRight,
  },
  {
    text: '⭐ Free distribution of essential supplies to the students studying in government schools.',
    position: 'left-0 bottom-6 w-[27rem] max-w-[42%]',
    line: { x1: 455, y1: 324, x2: 226, y2: 442 },
    variant: reboundRight,
  },
  {
    text: '⭐ Programs organized for free thermal mammography test for breast cancer patients.',
    position: 'right-0 bottom-6 w-[27rem] max-w-[42%]',
    line: { x1: 545, y1: 324, x2: 774, y2: 442 },
    variant: reboundRight,
  },
]

export default function Services() {
  return (
    <section  className="py-2">
      <h2 className="text-center">
        <motion.span variants={reboundRight} className=" font-serif text-3xl md:text-6xl font-bold text-pink-700">
               <Highlighter
                    action="underline"
                    animationDuration={950}
                    isView
                    color="deeppink"
                    iterations={2}
                    strokeWidth={2.5}
                  >What We Do ?</Highlighter>
          
        </motion.span>
      </h2>

      <div className="relative mx-auto mt-6 hidden min-h-[560px] max-w-full lg:block">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full  "
          viewBox="0 0 1000 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {services.map((service) => (
            <motion.line
              key={service.text}
              x1={service.line.x1}
              y1={service.line.y1}
              x2={service.line.x2}
              y2={service.line.y2}
              stroke="rgba(255 0 153 / 0.71)"
              strokeWidth="4"
              strokeDasharray="10 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.45, ease: 'easeOut' }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 z-10 grid size-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-pink-400  hover:border-pink-600 bg-white p-2 shadow-2xl shadow-pink-700/60"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.18 }}
        >
          <Image
            src="/bow.jpg"
            alt="Breast cancer awareness bow"
            width={200}
            height={200}
            sizes="8rem"
            className="size-full rounded-full object-cover"
          />
        </motion.div>

        {services.map((service, index) => (
          <motion.div
            key={service.text}
            className={`absolute z-20 ${service.position}`}
            variants={service.variant}
            {...delayed(0.55 + index * 0.06)}
          >
            <ServiceCard>{service.text}</ServiceCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 lg:hidden">
        <div className="relative mx-auto max-w-xl pl-6">
          <div className="absolute left-2 top-0 h-full w-px bg-pink-700/30" aria-hidden="true" />
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.text}
                className="relative"
                variants={reboundRight}
                {...delayed(0.25 + index * 0.05)}
              >
                <span className="absolute -left-[1.35rem] top-5 size-3 rounded-full border-2 border-white bg-pink-700 shadow text-shadow-lg" />
                <ServiceCard>{service.text}</ServiceCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-md border-2 border-[#a31b93] bg-gradient-to-r from-[#f6f7ff] to-[#fff7fb] px-5 py-3 text-center font-serif text-sm md:text-lg text-shadow-md font-extrabold leading-snug text-gray-800 shadow-[5px_5px_rgb(206_67_125)] transition-transform duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[0px_0px_rgb(38_51_129)] "
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}
