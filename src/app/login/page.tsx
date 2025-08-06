import { LoginForm } from "@/components/auth/login-form";

/**
 * Página de inicio de sesión.
 * Renderiza el formulario de inicio de sesión.
 * @returns {JSX.Element} El componente del formulario de inicio de sesión dentro de un contenedor.
 */
export default async function LoginPage() {
  return (
    <div className="container h-full mx-auto px-4 py-20">
      <LoginForm />
    </div>
  );
}