/*
  Warnings:

  - You are about to drop the column `message` on the `ProCollaborator` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `area` on table `ProCollaborator` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_proCollaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropIndex
DROP INDEX "ProCollaborator_area_idx";

-- DropIndex
DROP INDEX "ProCollaborator_profession_idx";

-- AlterTable
ALTER TABLE "ProCollaborator" DROP COLUMN "message",
ALTER COLUMN "area" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "role";

-- DropTable
DROP TABLE "Membership";

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "proCollaboratorId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_proCollaboratorId_fkey" FOREIGN KEY ("proCollaboratorId") REFERENCES "ProCollaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
