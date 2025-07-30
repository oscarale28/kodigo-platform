import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Navbar } from "../components/navbar"
import { Code, Users, Trophy, Clock, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Transforma tu futuro con
              <br />
              <span className="text-primary">Kodigo Academy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aprende programación con los bootcamps más completos y actualizados. Desde cero hasta convertirte en un
              desarrollador profesional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">¿Por qué elegir Kodigo?</h2>
          <p className="text-xl text-muted-foreground">La mejor experiencia de aprendizaje en programación</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Code className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Tecnologías Actuales</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Aprende las tecnologías más demandadas del mercado: React, Node.js, Python y más.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Mentores Expertos</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Aprende de desarrolladores senior con años de experiencia en la industria.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Proyectos Reales</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Construye un portafolio sólido con proyectos que impresionen a los empleadores.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Horarios Flexibles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Estudia a tu ritmo con clases en vivo y contenido disponible 24/7.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bootcamps Preview */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Nuestros Bootcamps</h2>
            <p className="text-xl text-muted-foreground">
              Programas intensivos diseñados para llevarte al siguiente nivel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Full Stack JavaScript
                </CardTitle>
                <CardDescription>16 semanas • Nivel intermedio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Domina React, Node.js, Express y MongoDB para convertirte en un desarrollador full stack.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    React & Next.js
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Node.js & Express
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    MongoDB & PostgreSQL
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Python & Data Science
                </CardTitle>
                <CardDescription>12 semanas • Nivel principiante</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Aprende Python desde cero y especialízate en análisis de datos y machine learning.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Python fundamentals
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Pandas & NumPy
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Machine Learning
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Mobile Development
                </CardTitle>
                <CardDescription>14 semanas • Nivel intermedio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Desarrolla aplicaciones móviles nativas con React Native y Flutter.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    React Native
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Flutter & Dart
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    App Store deployment
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Ver todos los bootcamps
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="text-center py-16 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">¿Listo para cambiar tu carrera?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya han transformado su futuro profesional con Kodigo Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Comenzar gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 Kodigo Academy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
