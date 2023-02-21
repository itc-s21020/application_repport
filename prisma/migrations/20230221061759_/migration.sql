-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "kind" INTEGER NOT NULL,
    "reason" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CerfiticateApplication" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "certificate_of_enrollment" INTEGER NOT NULL DEFAULT 0,
    "transcript" INTEGER NOT NULL DEFAULT 0,
    "attendance_certificate" INTEGER NOT NULL DEFAULT 0,
    "certificate_of_expected_graduation" INTEGER NOT NULL DEFAULT 0,
    "graduation_certificate" INTEGER NOT NULL DEFAULT 0,
    "health_certificate" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduled_date" TIMESTAMP(3) NOT NULL DEFAULT NOW() + '7 days',

    CONSTRAINT "CerfiticateApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_code_key" ON "Student"("code");

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CerfiticateApplication" ADD CONSTRAINT "CerfiticateApplication_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
