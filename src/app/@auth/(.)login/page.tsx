import LoginDialog from '@/components/auth/login-dialog';
import { LoginForm } from '@/components/auth/login-form';

/**
 * Intercepting route de /login para mostrar el diálogo de inicio de sesión.
 * Este archivo se ejecuta en el servidor y renderiza el diálogo de inicio de sesión.
 * @returns {JSX.Element} El componente de diálogo de inicio de sesión.
 */
export default async function LoginPage() {
  return (
    <LoginDialog>
      <LoginForm />
    </LoginDialog>
  );
}
