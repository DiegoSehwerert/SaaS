import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HeaderProps {
  user: any;
}

function Header({ user }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ProConnect</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">Hola, {user.name}</span>
                <Button asChild variant="outline">
                  <Link
                    href={
                      user.role === "ADMIN"
                        ? "/admin"
                        : user.role === "MANAGER"
                          ? "/professional"
                          : "/client"
                    }
                  >
                    Dashboard
                  </Link>
                </Button>
                <form action={logoutAction}>
                  <Button type="submit" variant="ghost">
                    Cerrar Sesión
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/register">Registrarse</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default async function LandingPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header user={user} />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Conecta con profesionales</span>
            <span className="block text-blue-600">que te entienden</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            La plataforma que conecta a profesionales especializados con
            clientes que necesitan seguimiento personalizado 1:1. No cursos
            masivos, sino atención real y dedicada.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              {user ? (
                <Button asChild size="lg" className="w-full">
                  <Link
                    href={
                      user.role === "ADMIN"
                        ? "/admin"
                        : user.role === "MANAGER"
                          ? "/professional"
                          : "/client"
                    }
                  >
                    Ir al Dashboard
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="w-full">
                  <Link href="/auth/register">Comenzar Ahora</Link>
                </Button>
              )}
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="#how-it-works">Cómo Funciona</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="how-it-works" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Para todos
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Dos formas de usar ProConnect
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">
                      Para Profesionales
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    ¿Eres entrenador personal, psicólogo, coach, nutricionista o
                    cualquier profesional que necesita hacer seguimiento
                    cercano? Gestiona tus clientes, programa sesiones y haz
                    seguimiento personalizado.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <CardTitle className="text-lg">Para Clientes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    ¿Necesitas ayuda personalizada y seguimiento real? Conecta
                    con profesionales especializados que te van a acompañar en
                    tu proceso de forma individual y dedicada.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-blue-600 border-0 text-white">
          <CardContent className="py-16 px-8 text-center">
            <CardTitle className="text-3xl font-extrabold sm:text-4xl mb-4">
              ¿Listo para comenzar?
            </CardTitle>
            <CardDescription className="text-lg text-blue-200 mb-8">
              Únete a la comunidad de profesionales y clientes que ya están
              conectando.
            </CardDescription>
            {!user && (
              <Button asChild size="lg" variant="secondary">
                <Link href="/auth/register">Registrarse Gratis</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
