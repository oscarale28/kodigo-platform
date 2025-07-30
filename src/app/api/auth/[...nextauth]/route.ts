import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Datos dummy para desarrollo
const DUMMY_USERS = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    password: "123456789",
    accessToken: "dummy-token-123",
  },
  {
    id: "2",
    name: "María García",
    email: "maria@example.com",
    password: "123456789",
    accessToken: "dummy-token-456",
  },
  {
    id: "3",
    name: "Carlos López",
    email: "carlos@example.com",
    password: "123456789",
    accessToken: "dummy-token-789",
  },
]

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // MODO DUMMY: Verificar con datos locales
          const user = DUMMY_USERS.find((u) => u.email === credentials.email && u.password === credentials.password)

          if (user) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              accessToken: user.accessToken,
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
})

export { handler as GET, handler as POST }
