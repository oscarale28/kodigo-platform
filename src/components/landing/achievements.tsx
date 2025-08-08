"use client"

import { useEffect, useRef, useState } from "react"
import CountUp from "react-countup"
import { AnimatedSection } from "../ui/animated-section"
import LandingSectionTitle from "./section-title"

const AnimatedCountUp = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const [shouldStart, setShouldStart] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStart(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-extrabold tracking-tight">
      <span className="bg-gradient-to-r from-accent-foreground via-primary to-accent-foreground bg-clip-text text-transparent">
        {shouldStart ? (
          <CountUp end={value} duration={1.6} suffix="%" />
        ) : (
          "0%"
        )}
      </span>
    </div>
  )
}

const LandingAchievements = () => {
  return (
    <section className="flex flex-col gap-10">
      <AnimatedSection animation="fadeIn" duration={600}>
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Líderes en {""}
            <LandingSectionTitle text="educación tecnológica" />
            {" "}
            en El Salvador
          </h1>
          <p className="mt-3 text-xl md:text-2xl text-muted-foreground">
            Nuestros resultados hablan por sí mismos.
          </p>
        </div>
      </AnimatedSection>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-accent-foreground/25">
        {[
          { value: 70, label: "de empleados en compañías top tech" },
          { value: 67, label: "de nuevos empleos en tecnología" },
          { value: 40, label: "más de ingresos promedio" },
        ].map(({ value, label }, index) => (
          <AnimatedSection
            key={label}
            animation="scaleIn"
            duration={600}
            delay={index * 200}
          >
            <div className="p-8 flex flex-col items-center text-center">
              <AnimatedCountUp value={value} delay={index * 200 + 300} />
              <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-[20ch]">{label}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}

export default LandingAchievements
