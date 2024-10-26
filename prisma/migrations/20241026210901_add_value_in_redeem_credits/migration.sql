/*
  Warnings:

  - Added the required column `value` to the `RedeemCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RedeemCode" ADD COLUMN     "value" INTEGER NOT NULL;
