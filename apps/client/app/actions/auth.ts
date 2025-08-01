"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "MANAGER" | "USER";
  };
}

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Email y contraseña son requeridos",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Credenciales inválidas",
      };
    }

    const data: LoginResponse = await response.json();

    // Guardar el token en cookies para SSR
    const cookieStore = await cookies();
    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    cookieStore.set("user", JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    // Revalidar la página para actualizar el estado del usuario
    revalidatePath("/");

    // Redirigir según el rol
    if (data.user.role === "ADMIN") {
      redirect("/admin");
    } else if (data.user.role === "MANAGER") {
      redirect("/professional");
    } else {
      redirect("/client");
    }
  } catch (error) {
    // Ignorar errores de redirección de Next.js
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error; // Re-throw redirect errors
    }
    console.error("Error en login:", error);
    return {
      error: "Error del servidor. Inténtalo de nuevo.",
    };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // Eliminar las cookies
    cookieStore.delete("access_token");
    cookieStore.delete("user");

    // Revalidar la página
    revalidatePath("/");

    // Redirigir al home
    redirect("/");
  } catch (error) {
    // Ignorar errores de redirección de Next.js
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error; // Re-throw redirect errors
    }
    console.error("Error en logout:", error);
  }
}
