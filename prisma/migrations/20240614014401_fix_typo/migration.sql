/*
  Warnings:

  - You are about to drop the column `Telephon` on the `Accommodation` table. All the data in the column will be lost.
  - Added the required column `telephon` to the `Accommodation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "Telephon",
ADD COLUMN     "telephon" TEXT NOT NULL;
