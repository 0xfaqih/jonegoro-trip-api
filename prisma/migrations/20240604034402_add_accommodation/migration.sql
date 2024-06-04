-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);
