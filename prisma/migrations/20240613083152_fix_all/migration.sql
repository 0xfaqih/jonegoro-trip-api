/*
  Warnings:

  - You are about to drop the column `price` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Souvenir` table. All the data in the column will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `Souvenir` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_tour_id_fkey";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Souvenir" DROP COLUMN "price",
ADD COLUMN     "location" TEXT NOT NULL;

-- DropTable
DROP TABLE "Price";
