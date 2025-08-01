import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeder...');

  // Verificar si ya existe un admin
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: 'ADMIN',
    },
  });

  if (existingAdmin) {
    console.log('✅ Ya existe un usuario admin, saltando creación...');
    return;
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash('admin12345678Aa', 10);

  // Crear usuario admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador ProConnect',
      email: 'admin@proconnect.com',
      role: 'ADMIN',
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
    include: {
      password: true,
    },
  });

  console.log('✅ Usuario admin creado exitosamente:');
  console.log('📧 Email: admin@proconnect.com');
  console.log('🔑 Contraseña: admin12345678Aa');
  console.log('🆔 ID:', adminUser.id);
  console.log('👤 Nombre:', adminUser.name);
  console.log('🛡️ Rol:', adminUser.role);
}

main()
  .catch((e) => {
    console.error('❌ Error ejecutando seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Desconectado de la base de datos');
  });
