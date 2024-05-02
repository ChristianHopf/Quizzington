/*
  Warnings:

  - Added the required column `length` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
DELETE FROM "Choice";
DELETE FROM "Question";
DELETE FROM "Quiz";
ALTER TABLE "Quiz" ADD COLUMN     "length" INTEGER NOT NULL;
