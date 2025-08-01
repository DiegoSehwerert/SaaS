import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "USER";
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie?.value) {
      return null;
    }

    return JSON.parse(userCookie.value) as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("access_token");

    return tokenCookie?.value || null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}
