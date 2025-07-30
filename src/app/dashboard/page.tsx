import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { BookOpen, Clock, Users, Trophy, Calendar, Play, Database } from "lucide-react"

// Datos dummy para desarrollo
const DUMMY_BOOTCAMPS = [
  {
    id: 1,
    title: "Full Stack JavaScript",
    description: "Aprende React, Node.js y MongoDB desde cero",
    duration: "16 semanas",
    level: "Intermedio",
    students: 245,
    progress: 65,
    status: "En progreso",
    nextClass: "2024-01-15T10:00:00Z",
    instructor: "María González",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 2,
    title: "Python & Data Science",
    description: "Domina Python y análisis de datos",
    duration: "12 semanas",
    level: "Principiante",
    students: 189,
    progress: 30,
    status: "En progreso",
    nextClass: "2024-01-16T14:00:00Z",
    instructor: "Carlos Ruiz",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
  },
  {
    id: 3,
    title: "Mobile Development",
    description: "Desarrolla apps con React Native",
    duration: "14 semanas",
    level: "Avanzado",
    students: 156,
    progress: 0,
    status: "Próximamente",
    nextClass: "2024-02-01T09:00:00Z",
    instructor: "Ana Martínez",
    technologies: ["React Native", "Flutter", "Dart", "Firebase"],
  },
  {
    id: 4,
    title: "DevOps & Cloud",
    description: "Aprende Docker, Kubernetes y AWS",
    duration: "10 semanas",
    level: "Avanzado",
    students: 98,
    progress: 85,
    status: "En progreso",
    nextClass: "2024-01-17T16:00:00Z",
    instructor: "Roberto Silva",
    technologies: ["Docker", "Kubernetes", "AWS", "Jenkins"],
  },
]

async function getBootcamps(token = "dummy-token") {
  // Simular delay de API
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log("Obteniendo bootcamps con token:", token)

  return DUMMY_BOOTCAMPS
}

export default async function DashboardPage() {
  // En modo dummy, usar datos por defecto
  const userName = "Usuario Demo"
  const accessToken = "dummy-token"

  const bootcamps = await getBootcamps(accessToken)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">¡Hola, {userName}! 👋</h1>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              <Database className="mr-1 h-3 w-3" />
              Modo Demo
            </Badge>
          </div>
          <p className="text-muted-foreground">Continúa tu aprendizaje y alcanza tus objetivos</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bootcamps Activos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bootcamps.filter((b: any) => b.status === "En progreso").length}
              </div>
              <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Completadas</CardTitle>
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
              <p className="text-xs text-muted-foreground">3 completados este mes</p>
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

        {/* Bootcamps Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Mis Bootcamps</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Datos de demostración
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bootcamps.map((bootcamp: any) => (
              <Card key={bootcamp.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{bootcamp.title}</CardTitle>
                      <CardDescription>{bootcamp.description}</CardDescription>
                    </div>
                    <Badge variant={bootcamp.status === "En progreso" ? "default" : "secondary"}>
                      {bootcamp.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {bootcamp.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {bootcamp.students} estudiantes
                    </div>
                  </div>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-1">
                    {bootcamp.technologies.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {bootcamp.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{bootcamp.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  {bootcamp.status === "En progreso" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{bootcamp.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${bootcamp.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Instructor: {bootcamp.instructor}</span>
                    </div>
                    {bootcamp.status === "En progreso" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          Próxima clase:{" "}
                          {new Date(bootcamp.nextClass).toLocaleDateString("es-ES", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {bootcamp.status === "En progreso" ? (
                      <Button className="flex-1">
                        <Play className="mr-2 h-4 w-4" />
                        Continuar
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Ver detalles
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Acciones rápidas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Explorar Bootcamps
                </CardTitle>
                <CardDescription>Descubre nuevos bootcamps disponibles</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Comunidad
                </CardTitle>
                <CardDescription>Conecta con otros estudiantes</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
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

        {/* Información de desarrollo */}
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Información de Desarrollo</span>
          </div>
          <p className="text-xs text-blue-700">
            Estás viendo datos de demostración. Toda la lógica de autenticación y APIs está implementada y lista para
            usar con las variables de entorno reales.
          </p>
        </div>
      </div>
    </div>
  )
}
