/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - Added the required column `scannedAt` to the `Plagiarism` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Plagiarism` ADD COLUMN `scannedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;
