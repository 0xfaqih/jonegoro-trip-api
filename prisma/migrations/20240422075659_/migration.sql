/*
  Warnings:

  - The `pictures` column on the `Tour` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "pictures",
ADD COLUMN     "pictures" BYTEA[];
