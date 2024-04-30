/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_tourId_fkey";

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "pictures" TEXT[];

-- DropTable
DROP TABLE "Picture";
