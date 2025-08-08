import { SiNextdotjs, SiOpenai, SiPostgresql, SiPython, SiReact, SiTypescript } from "@icons-pack/react-simple-icons"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaJava } from "react-icons/fa"
import { AnimatedSection } from "../ui/animated-section"
import { Button } from "../ui/button"
import LandingSectionTitle from "./section-title"

const LandingHero = () => {
  return (
    <section className="w-full px-4 pt-28! relative">
      <div className="mx-auto grid items-center gap-10 md:grid-cols-2">
        {/* Left: copy */}
        <AnimatedSection animation="slideRight" duration={800}>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
            <LandingSectionTitle text="Aprende a programar construyendo" />
            <br />
            soluciones de alto impacto
          </h1>
          <p className="mt-5 max-w-xl text-lg md:text-xl text-muted-foreground">
            Domina las tecnologías más demandadas con una experiencia inmersiva y enfocada a resultados.
          </p>

          <div className="my-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="px-8 py-6 text-lg font-semibold">
                Comenzar ahora
                <ArrowRight className="ml-2 h-8 w-8" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Right: person with chips */}
        <AnimatedSection animation="slideLeft" duration={800} delay={200}>
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/dx2f2mmwb/image/upload/e_background_removal/f_png/v1754610710/hero-image_gbnpbf.webp"
              alt="Estudiante aprendiendo a programar"
              width={2000}
              height={2000}
              priority
            />

            {/* Floating tech chips */}
            {[
              { label: "React", icon: <SiReact className="h-4 w-4 md:h-6 md:w-6 text-sky-400" />, className: "top-2 left-20" },
              { label: "Next.js", icon: <SiNextdotjs className="h-4 w-4 md:h-6 md:w-6" />, className: "top-30 -left-6" },
              { label: "TypeScript", icon: <SiTypescript className="h-4 w-4 md:h-6 md:w-6 text-blue-500" />, className: "top-10 right-6" },
              { label: "Java", icon: <FaJava className="h-4 w-4 md:h-6 md:w-6 text-orange-600" />, className: "bottom-30 -left-2" },
              { label: "Python", icon: <SiPython className="h-4 w-4 md:h-6 md:w-6 text-blue-500" />, className: "bottom-2 left-12" },
              { label: "PostgreSQL", icon: <SiPostgresql className="h-4 w-4 md:h-6 md:w-6 text-sky-700" />, className: "bottom-8 right-10" },
              { label: "OpenAI", icon: <SiOpenai className="h-4 w-4 md:h-6 md:w-6 text-black" />, className: "top-1/2 -right-5" },
            ].map((tech, i) => (
              <div
                key={tech.label}
                className={`absolute ${tech.className} animate-bounce flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-1 text-xs md:text-sm shadow-md backdrop-blur`}
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '3s'
                }}
              >
                <span>{tech.icon}</span>
                <span className="font-medium">{tech.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default LandingHero