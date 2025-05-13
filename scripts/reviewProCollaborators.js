// scripts/reviewProCollaborators.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const collaborators = await prisma.proCollaborator.findMany({
      include: {
        workPhotos: true,
        workedAreas: true,
        ratings: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Calcular el promedio de calificaciones, igual que en el endpoint
    const collaboratorsWithAverageRating = collaborators.map((pro) => {
      const ratings = pro.ratings;
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating.value, 0) / ratings.length
          : 0;
      return { ...pro, averageRating: parseFloat(averageRating.toFixed(1)) };
    });

    console.log('Colaboradores Profesionales registrados en /join-as-pro:');
    console.log(JSON.stringify(collaboratorsWithAverageRating, null, 2));
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();