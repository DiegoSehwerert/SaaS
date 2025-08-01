import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { logoutAction } from "@/app/actions/auth";
import Link from "next/link";

export default async function ClientDashboard() {
  const user = await getCurrentUser();

  // Verificar si está autenticado
  if (!user) {
    redirect("/auth/login");
  }

  // Verificar si es cliente
  if (user.role !== "USER") {
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
              <span className="ml-4 text-sm text-gray-500">Dashboard Cliente</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Hola, {user.name}
              </span>
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
              Encuentra y conecta con profesionales especializados
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Profesionales Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Profesionales
                </CardTitle>
                <CardDescription>
                  Encuentra el profesional ideal para ti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">Explora profesionales en:</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Entrenamiento personal</li>
                    <li>• Psicología</li>
                    <li>• Coaching nutricional</li>
                    <li>• Y más...</li>
                  </ul>
                </div>
                <Button className="w-full">
                  Explorar Profesionales
                </Button>
              </CardContent>
            </Card>

            {/* Mis Sesiones Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Mis Sesiones
                </CardTitle>
                <CardDescription>
                  Programa y gestiona tus citas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">0</div>
                <p className="text-sm text-gray-500 mb-4">Sesiones programadas</p>
                <Button variant="outline" className="w-full">
                  Ver Calendario
                </Button>
              </CardContent>
            </Card>

            {/* Mi progreso Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Mi Progreso
                </CardTitle>
                <CardDescription>
                  Sigue tu evolución personal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm"><span className="font-medium">Email:</span> {user.email}</p>
                  <p className="text-sm"><span className="font-medium">Tipo:</span> Cliente</p>
                </div>
                <Button variant="outline" className="w-full">
                  Ver Progreso
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started Section */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Comenzar tu Journey</CardTitle>
                <CardDescription>
                  Pasos para encontrar el profesional perfecto para ti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                      <span className="text-lg font-medium text-blue-600">1</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Define tus objetivos</h3>
                    <p className="text-sm text-gray-500">¿Qué tipo de ayuda necesitas?</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                      <span className="text-lg font-medium text-green-600">2</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Encuentra profesionales</h3>
                    <p className="text-sm text-gray-500">Explora perfiles y especialidades</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                      <span className="text-lg font-medium text-purple-600">3</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Comienza tu seguimiento</h3>
                    <p className="text-sm text-gray-500">Agenda tu primera sesión</p>
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
