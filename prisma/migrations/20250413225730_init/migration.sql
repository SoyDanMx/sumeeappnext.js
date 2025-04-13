/*
  Warnings:

  - You are about to drop the column `workPhotos` on the `ProCollaborator` table. All the data in the column will be lost.
  - You are about to drop the column `workedAreas` on the `ProCollaborator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'basic',
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- AlterTable
ALTER TABLE "ProCollaborator" DROP COLUMN "workPhotos",
DROP COLUMN "workedAreas";

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "value" SET DEFAULT 5;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "WorkPhoto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "proCollaboratorId" INTEGER NOT NULL,

    CONSTRAINT "WorkPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkedArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proCollaboratorId" INTEGER NOT NULL,

    CONSTRAINT "WorkedArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProCollaborator_profession_idx" ON "ProCollaborator"("profession");

-- CreateIndex
CREATE INDEX "ProCollaborator_area_idx" ON "ProCollaborator"("area");

-- CreateIndex
CREATE INDEX "Rating_userId_idx" ON "Rating"("userId");

-- CreateIndex
CREATE INDEX "Rating_proCollaboratorId_idx" ON "Rating"("proCollaboratorId");

-- AddForeignKey
ALTER TABLE "WorkPhoto" ADD CONSTRAINT "WorkPhoto_proCollaboratorId_fkey" FOREIGN KEY ("proCollaboratorId") REFERENCES "ProCollaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkedArea" ADD CONSTRAINT "WorkedArea_proCollaboratorId_fkey" FOREIGN KEY ("proCollaboratorId") REFERENCES "ProCollaborator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
