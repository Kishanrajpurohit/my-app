-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "customername" TEXT NOT NULL,
    "mobilenumber" TEXT NOT NULL,
    "devicename" TEXT NOT NULL,
    "problem" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);
