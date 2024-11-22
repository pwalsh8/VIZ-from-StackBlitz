import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/ui/logo';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <Logo className="w-auto h-auto" showText={true} />
          <div className="text-center">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}