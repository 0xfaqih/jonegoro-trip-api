-- CreateTable
CREATE TABLE "Souvenir" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Souvenir_pkey" PRIMARY KEY ("id")
);
