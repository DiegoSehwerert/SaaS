import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";

interface LoginPageProps {
  searchParams: { message?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="block">
            <h2 className="text-3xl font-bold text-gray-900">ProConnect</h2>
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {searchParams.message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
            {searchParams.message}
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
