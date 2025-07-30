import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acceso a todas las rutas públicas
  const publicPaths = ["/", "/login", "/register", "/api"]

  // Verificar si la ruta actual es pública
  const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(path))

  // En modo desarrollo, permitir acceso a todas las rutas
  // Esto incluye el dashboard para facilitar las pruebas
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  // Para rutas públicas, continuar normalmente
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Para rutas protegidas, verificar si hay sesión
  // En modo dummy, permitir acceso
  const hasSession = request.cookies.get("next-auth.session-token")

  if (!hasSession && pathname.startsWith("/dashboard")) {
    // Redirigir a login si no hay sesión (en producción)
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
