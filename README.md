# Kodigo Platform 🎓

El proyecto consiste en una plataforma de cursos online desarrollada con **Next.js 15** y **Supabase**. Permite a los usuarios explorar cursos, inscribirse y gestionar sus inscripciones desde un dashboard personalizado.

## Tabla de Contenidos

- [🚀 Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#-stack-tecnológico)
- [📊 Esquema de Base de Datos](#-esquema-de-base-de-datos)
- [🔧 Configuración e Instalación](#-configuración-e-instalación)
  - [Prerrequisitos](#prerrequisitos)
- [🗄️ Integración con Supabase](#-integración-con-supabase)
  - [Model Context Protocol (MCP) para Supabase](#model-context-protocol-mcp-para-supabase)
    - [Configuración del MCP](#configuración-del-mcp)
    - [Cómo usar el MCP](#cómo-usar-el-mcp)
    - [Comandos útiles con MCP](#comandos-útiles-con-mcp)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)

---

## 🚀 Características Principales

- **Landing Page**: Muestra todos los cursos activos disponibles
- **Dashboard**: Panel personalizado para usuarios autenticados con sus cursos inscritos
- **Autenticación**: Sistema de login/registro integrado con Supabase Auth
- **Responsive Design**: Interfaz adaptativa para todos los dispositivos

## 🛠️ Stack Tecnológico

### Frontend

- **[Next.js 15](https://nextjs.org/)** - Framework de React para producción
- **[React 19](https://react.dev/)** - Biblioteca de JavaScript para interfaces de usuario
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI reutilizables

### Backend & Base de Datos

- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
  - PostgreSQL Database
  - Authentication & Authorization
  - Row Level Security (RLS)
  - Real-time subscriptions

### Herramientas de Desarrollo

- **[pnpm](https://pnpm.io/)** - Gestor de paquetes eficiente
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de UI accesibles
- **[Lucide React](https://lucide.dev/)** - Biblioteca de iconos
- **[React Hook Form](https://react-hook-form.com/)** - Manejo de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript
- **[Geist Font](https://vercel.com/font)** - Tipografía moderna de Vercel

## 📊 Esquema de Base de Datos

### Tabla `courses`

```sql
- id (UUID, Primary Key)
- title (TEXT, NOT NULL)
- description (TEXT)
- image_url (TEXT)
- duration (TEXT) - ej: "4 semanas", "20 horas"
- level (TEXT) - "Principiante", "Intermedio", "Avanzado"
- is_active (BOOLEAN, DEFAULT true)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabla `enrollments`

```sql
- id (UUID, Primary Key)
- user_id (UUID, FK → auth.users)
- course_id (UUID, FK → courses)
- enrolled_at (TIMESTAMP)
- UNIQUE(user_id, course_id)
```

### Políticas de Seguridad (RLS)

- **Cursos activos**: Visibles para todos (landing page)
- **Todos los cursos**: Visibles solo para usuarios autenticados (dashboard)
- **Inscripciones**: Cada usuario solo puede ver y gestionar las suyas

## 🔧 Configuración e Instalación

### Prerrequisitos

- Node.js 18+
- pnpm ([recomendado por la documentación oficial de Next.js](https://nextjs.org/learn/dashboard-app/getting-started))
- Cuenta de Supabase

### 1. Clonar el repositorio

```bash
git clone https://github.com/oscarale28/kodigo-platform.git
cd kodigo-platform
```

### 2. Instalar dependencias

Si no tienes `pnpm` instalado, puedes instalarlo globalmente:

```bash
npm install -g pnpm
```

Si ya tienes `pnpm`, instala las dependencias del proyecto:

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto, basado en el archivo `.env.example`:

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_SUPABASE_URL=supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase_project_anon_key
```

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🗄️ Integración con Supabase

### Model Context Protocol (MCP) para Supabase

Para facilitar el desarrollo, este proyecto utiliza el **Supabase MCP Server** para gestión avanzada de la base de datos directamente desde VS Code. Esta integración permite realizar operaciones de base de datos, migraciones, y administración sin salir del editor.

#### Configuración del MCP

El archivo `.vscode/mcp.json` contiene la configuración:

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "supabase-access-token",
      "description": "Supabase personal access token",
      "password": true
    }
  ],
  "servers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@latest",
        "--project-ref=crxsrzzqohcypdtaveug"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "${input:supabase-access-token}"
      }
    }
  }
}
```

#### Cómo usar el MCP

1. **Prerequisitos**:

   - VS Code con extensión GitHub Copilot
   - Token de acceso personal de Supabase

2. **Obtener el token de Supabase**:

   - Ve a [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)
   - Crea un nuevo token de acceso personal
   - Cópialo (se usará en el siguiente paso)

3. **Activar en VS Code**:

   - Abre el proyecto en VS Code
   - GitHub Copilot detectará automáticamente la configuración MCP
   - Te pedirá el token de acceso cuando sea necesario

4. **Operaciones disponibles**:

   ```bash
   # Consultas SQL
   "Ejecuta una consulta para obtener todos los cursos activos"

   # Migraciones
   "Crea una migración para agregar campo 'instructor' a la tabla courses"

   # Administración
   "Muestra el estado de las migraciones"
   "Lista todas las tablas de la base de datos"
   "Genera los tipos TypeScript para el proyecto"

   # Análisis
   "Revisa las políticas de seguridad de la tabla enrollments"
   "Obtén los logs de la base de datos"
   ```

5. **Comandos útiles con MCP**:
   - **Consultas**: "¿Cuántos usuarios están inscritos en cada curso?"
   - **Esquema**: "Muestra la estructura de la tabla courses"
   - **Seguridad**: "Revisa las políticas RLS del proyecto"
   - **Migraciones**: "Aplica una migración para agregar índices"
   - **Monitoreo**: "Muestra los logs de autenticación"

## 📁 Estructura del Proyecto

```
├── .vscode/
│   └── mcp.json                 # Configuración MCP Supabase
├── public/                      # Archivos estáticos
├── src/
│   ├── app/                     # App Router de Next.js
│   │   ├── dashboard/           # Páginas del dashboard
│   │   ├── login/              # Página de login
│   │   ├── register/           # Página de registro
│   │   └── page.tsx            # Landing page
│   ├── components/             # Componentes reutilizables
│   │   └── ui/                 # Componentes de shadcn/ui
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilidades y configuraciones
│   │   ├── actions/            # Server actions
│   │   ├── supabase/           # Configuración Supabase
│   │   └── validations/        # Esquemas Zod
├── components.json             # Configuración shadcn/ui
└── package.json
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Servidor de desarrollo

# Producción
pnpm build        # Construir para producción
pnpm start        # Ejecutar build de producción

# Calidad de código
pnpm lint         # Ejecutar ESLint
```

## 🔒 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- **Políticas granulares** para acceso a datos
- **Validación de esquemas** con Zod
- **Autenticación segura** con Supabase Auth
- **Variables de entorno** para credenciales sensibles

---

⭐ Este proyecto fue desarrollado como parte del Bootcamp Full Stack Jr de KODIGO.
