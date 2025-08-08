'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { techLogos } from '@/lib/techLogos'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {BookOpen,
  Calendar,
  Clock,
  Laptop,
  Trophy,
  Play,
  Rocket,
  Users, LogIn
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getBootcampsFromDB } from '@/lib/supabase/bootcamps'
import {AnimatedSection} from '@/components/ui/animated-section' 



const supabase = createClient()

type Bootcamp = {
  id: string
  title: string
  description: string
  duration: string
  modality: string
    start_date: string
  end_date: string
  is_active:boolean
  technologies?: string[]
}

//funcion para mostrar los bootcamps
export default function DashboardPage() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([])
  const [enrolledIds, setEnrolledIds] = useState<string[]>([])
  const [userName, setUserName] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, string>>({})

  //Para limpiar el arry que viene de supabase
  useEffect(() => {
    const cleanTechnologies = (rawTechs: any): string[] => {
      if (!Array.isArray(rawTechs)) return []
      return rawTechs.map((tech) =>
        tech.replace(/[{}"]/g, '').trim()
      )
    }

    const fetchData = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUserName(user?.user_metadata?.name ?? 'Estudiante')

      const { data: enrolled } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', user?.id)

      setEnrolledIds(enrolled?.map((e) => e.course_id) ?? [])

      const bootcampsRaw = await getBootcampsFromDB()

      const bootcamps = bootcampsRaw.map((b) => ({
        ...b,
        technologies: cleanTechnologies(b.technologies),
      }))

      setBootcamps(bootcamps)
    }

    fetchData()
  }, [])

  const showMessage = (courseId: string, msg: string) => {
    setMessages((prev) => ({ ...prev, [courseId]: msg }))
    setTimeout(() => {
      setMessages((prev) => {
        const copy = { ...prev }
        delete copy[courseId]
        return copy
      })
    }, 3000)
  }

  const enrollToBootcamp = async (courseId: string) => {
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (!user) return alert('Debes iniciar sesión')

    const { data: already } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .maybeSingle()

  

    const { error } = await supabase.from('enrollments').insert({
      user_id: user.id,
      course_id: courseId
    })

    if (error) {
      console.error(error)
      alert('Error al inscribirse')
    } else {
      setEnrolledIds((prev) => [...prev, courseId])
      showMessage(courseId, '✅ ¡Inscripción exitosa!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-28">
      <div className="mb-8">
        <h1 className="text-3xl mb-2 font-bold">¡Hola, {userName}! 👋</h1>
        <p className="text-muted-foreground">
          Continúa tu aprendizaje y alcanza tus objetivos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bootcamps Activos
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          {/* Tarjeta consulta DB bootcamps activo */}
          <CardContent>
            <div className="text-2xl font-bold">
              {bootcamps.filter((b) => b.is_active).length}
            </div>

            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Horas Completadas
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+23 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyectos</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 completados este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 nuevo disponible</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Bootcamps Disponibles</h2>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Supabase Live
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bootcamps.map((bootcamp, index) => {
            const isEnrolled = enrolledIds.includes(bootcamp.id);
            const formattedStart = new Date(
              bootcamp.start_date
            ).toLocaleDateString();

            return (
              <AnimatedSection
                key={bootcamp.id}
                animation="slideUp"
                duration={600}
                delay={index * 200}
              >
                <Card className="group relative flex flex-col overflow-hidden border border-border/60 bg-background/70 transition-transform hover:-translate-y-1 h-full">
                  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-accent-foreground/10 via-transparent to-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />

                  <CardHeader className="gap-3">
                    <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                      <Rocket className="h-5 w-5 text-accent-foreground" />
                      {bootcamp.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {bootcamp.description ||
                        "Aprende construyendo proyectos reales, guiado por mentores con experiencia."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        {formattedStart}
                      </Badge>
                    </div>

                    <div className="grid gap-2 text-sm text-muted-foreground">
                      {bootcamp.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-accent-foreground" />
                          <span>
                            Duración:{" "}
                            <span className="text-foreground">
                              {bootcamp.duration}
                            </span>
                          </span>
                        </div>
                      )}
                      {bootcamp.modality && (
                        <div className="flex items-center gap-2">
                          <Laptop className="h-4 w-4 text-accent-foreground" />
                          <span>
                            Modalidad:{" "}
                            <span className="text-foreground capitalize">
                              {bootcamp.modality}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Logos para los Bootcamps*/}
                    <div className="flex flex-wrap gap-3 pt-2 justify-center">
                      {bootcamp.technologies?.map((tech) => {
                        const logo = techLogos[tech];
                        return (
                          logo && (
                            <img
                              key={tech}
                              src={logo}
                              alt={tech}
                              className="h-6 w-6 object-contain"
                              title={tech}
                            />
                          )
                        );
                      })}
                    </div>

                    {/* Botón Incribirse o Continuar*/}
                    <div className="mt-2 space-y-2">
                      {isEnrolled ? (
                        <Button
                          className="w-full bg-blue-900 text-white hover:bg-blue-800"
                          onClick={() =>
                            showMessage(
                              bootcamp.id,
                              "🔔Felicidades, continúa aprendiendo.💡"
                            )
                          }
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Continuar
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => enrollToBootcamp(bootcamp.id)}
                        >
                          <LogIn className="mr-2 h-4 w-4" />
                          Inscribirme
                        </Button>
                      )}

                      {/* Mensaje con espacio reservado */}
                      <div className="min-h-[24px]">
                        {messages[bootcamp.id] && (
                          <p className="text-sm text-green-600">
                            {messages[bootcamp.id]}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Acciones rápidas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Explorar Bootcamps
              </CardTitle>
              <CardDescription>
                Descubre nuevos bootcamps disponibles
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Comunidad
              </CardTitle>
              <CardDescription>Conecta con otros estudiantes</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Mis Certificados
              </CardTitle>
              <CardDescription>Ver certificados obtenidos</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
  
    </div>
  );
}
