"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "MANAGER" | "USER";
}

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "MANAGER" | "USER";

  if (!name || !email || !password || !role) {
    return {
      error: "Todos los campos son requeridos",
    };
  }

  if (password.length < 6) {
    return {
      error: "La contraseña debe tener al menos 6 caracteres",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData.message || "Error al registrar usuario",
      };
    }

    // Revalidar la página
    revalidatePath("/");

    // Redirigir al login después del registro exitoso
    redirect(
      "/auth/login?message=Usuario registrado exitosamente. Por favor inicia sesión.",
    );
  } catch (error) {
    // Ignorar errores de redirección de Next.js
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Error en registro:", error);
    return {
      error: "Error del servidor. Inténtalo de nuevo.",
    };
  }
}
