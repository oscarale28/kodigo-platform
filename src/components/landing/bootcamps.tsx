import { getFeaturedBootcamps } from "@/lib/actions/bootcamps.actions"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { ArrowRight, Calendar, Clock, Code, Laptop } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "../ui/animated-section"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import LandingSectionTitle from "./section-title"

const LandingBootcamps = async () => {
  const bootcamps = await getFeaturedBootcamps()

  return (
    <section className="flex flex-col gap-10">
      <AnimatedSection animation="fadeIn" duration={600}>
        <div className="text-start">
          <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight">
            <LandingSectionTitle text="Impulsa hoy tu carrera" />
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            Conoce nuestros bootcamps más populares, diseñados para llevar tu carrera al siguiente nivel.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {bootcamps && bootcamps.length > 0 ? (
          bootcamps.map(({ id, title, description, modality, duration, start_date }, index) => {
            let formattedStart = "Próximamente"
            try {
              if (start_date) {
                formattedStart = `Inicia ${format(parseISO(start_date), "d 'de' MMMM yyyy", { locale: es })}`
              }
            } catch {
              // keep default
            }

            return (
              <AnimatedSection
                key={id}
                animation="slideUp"
                duration={600}
                delay={index * 200}
              >
                <Card className="group relative overflow-hidden border border-border/60 bg-background/70 transition-transform hover:-translate-y-1 h-full">
                  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-accent-foreground/10 via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />

                  <CardHeader className="gap-3">
                    <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                      <Code className="h-5 w-5 text-accent-foreground" />
                      {title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {description || "Aprende construyendo proyectos reales, guiado por mentores con experiencia."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formattedStart}
                      </Badge>
                    </div>

                    <div className="mt-2 grid gap-2 text-sm text-muted-foreground">
                      {duration ? (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent-foreground" />
                          <span>Duración: <span className="text-foreground">{duration}</span></span>
                        </div>
                      ) : null}
                      {modality ? (
                        <div className="flex items-center gap-2">
                          <Laptop className="h-4 w-4 text-accent-foreground" />
                          <span>Modalidad: <span className="text-foreground capitalize">{modality}</span></span>
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )
          })
        ) : (
          <div className="col-span-3 text-center text-muted-foreground">
            No hay bootcamps activos en este momento.
          </div>
        )}
      </div>

      <AnimatedSection animation="scaleIn" duration={600} delay={600}>
        <div className="text-center">
          <Link href="/dashboard">
            <Button size="lg" className="mb-6 px-8 py-6 text-lg font-semibold">
              Ver todos y registrarme
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </AnimatedSection>
          </section>
  )
}

export default LandingBootcamps
