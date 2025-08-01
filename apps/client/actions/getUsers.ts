import { apiRequest } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email?: string;
  // Agrega más propiedades según tu modelo de Prisma
}

export async function getUsers(): Promise<User[]> {
  return apiRequest<User[]>("/users");
}
