-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_tour_id_fkey";

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;
