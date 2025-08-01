import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logoutAction } from "@/app/actions/auth";
import Link from "next/link";

export default async function ProfessionalDashboard() {
  const user = await getCurrentUser();

  // Verificar si está autenticado
  if (!user) {
    redirect("/auth/login");
  }

  // Verificar si es profesional
  if (user.role !== "MANAGER") {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                ProConnect
              </Link>
              <span className="ml-4 text-sm text-gray-500">
                Dashboard Profesional
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
              <form action={logoutAction}>
                <Button type="submit" variant="outline">
                  Cerrar Sesión
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Bienvenido, {user.name}
            </h1>
            <p className="mt-2 text-gray-600">
              Gestiona tus clientes y sesiones desde tu dashboard profesional
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Clientes Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  Mis Clientes
                </CardTitle>
                <CardDescription>
                  Gestiona y haz seguimiento a tus clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">0</div>
                <p className="text-sm text-gray-500 mb-4">Clientes activos</p>
                <Button variant="outline" className="w-full">
                  Ver Clientes
                </Button>
              </CardContent>
            </Card>

            {/* Sesiones Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Sesiones
                </CardTitle>
                <CardDescription>
                  Programa y gestiona tus sesiones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">0</div>
                <p className="text-sm text-gray-500 mb-4">
                  Sesiones esta semana
                </p>
                <Button variant="outline" className="w-full">
                  Ver Calendario
                </Button>
              </CardContent>
            </Card>

            {/* Perfil Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Mi Perfil
                </CardTitle>
                <CardDescription>
                  Configura tu perfil profesional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Rol:</span> Profesional
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Comenzar</CardTitle>
                <CardDescription>
                  Configura tu cuenta profesional para empezar a recibir
                  clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <span className="text-sm font-medium text-blue-600">
                          1
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Completa tu perfil
                      </h3>
                      <p className="text-sm text-gray-500">
                        Agrega tu especialidad y experiencia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <span className="text-sm font-medium text-green-600">
                          2
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Configura tus servicios
                      </h3>
                      <p className="text-sm text-gray-500">
                        Define qué tipo de ayuda ofreces
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
