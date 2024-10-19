/*
  Warnings:

  - You are about to drop the column `tokenType` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "tokenType",
ADD COLUMN     "token_type" TEXT;
