-- CreateTable
CREATE TABLE "Userdata" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT,
    "dob" TEXT,
    "cardNumber" TEXT NOT NULL,
    "cardHolderName" TEXT,
    "expiryDate" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Userdata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Userdata_email_key" ON "Userdata"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Userdata_phoneNumber_key" ON "Userdata"("phoneNumber");
