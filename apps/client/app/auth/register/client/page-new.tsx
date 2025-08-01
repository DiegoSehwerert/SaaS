import Link from "next/link";
import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterClientPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="block">
            <h2 className="text-3xl font-bold text-gray-900">ProConnect</h2>
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Inicia sesión aquí
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600">
            ¿Eres profesional?{" "}
            <Link
              href="/auth/register/professional"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Regístrate como profesional
            </Link>
          </p>
        </div>

        <RegisterForm
          role="USER"
          title="Registro de Cliente"
          description="Crea tu cuenta para conectar con profesionales especializados"
        />
      </div>
    </div>
  );
}
