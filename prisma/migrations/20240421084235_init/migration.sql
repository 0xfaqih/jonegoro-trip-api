-- CreateTable
CREATE TABLE "Tour" (
    "id" SERIAL NOT NULL,
    "tour_name" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "desc" TEXT,
    "pict" TEXT[],

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "ticket" DOUBLE PRECISION NOT NULL,
    "motor_park" DOUBLE PRECISION NOT NULL,
    "car_park" DOUBLE PRECISION NOT NULL,
    "tour_id" INTEGER NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Price_tour_id_key" ON "Price"("tour_id");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
