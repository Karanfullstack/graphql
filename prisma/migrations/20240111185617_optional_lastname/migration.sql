-- AlterTable
ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "salt" DROP NOT NULL;
