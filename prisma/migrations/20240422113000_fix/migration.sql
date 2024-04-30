/*
  Warnings:

  - You are about to drop the column `pictures` on the `Tour` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "pictures",
ADD COLUMN     "pict" TEXT[];
