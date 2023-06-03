/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `archived` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `domain` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `publicStats` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `scaned` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SentEmail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url,key]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteId` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Website` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Website_createdAt_idx` ON `Website`;

-- DropIndex
DROP INDEX `Website_domain_key_key` ON `Website`;

-- DropIndex
DROP INDEX `Website_key_endpoint_idx` ON `Website`;

-- DropIndex
DROP INDEX `Website_password_idx` ON `Website`;

-- DropIndex
DROP INDEX `Website_scaned_idx` ON `Website`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailVerified`,
    DROP COLUMN `image`,
    ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `billingCycleStart` INTEGER NULL,
    ADD COLUMN `plan` VARCHAR(191) NOT NULL DEFAULT 'free',
    ADD COLUMN `stripeId` VARCHAR(191) NULL,
    ADD COLUMN `usage` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `usageLimit` INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE `Website` DROP COLUMN `archived`,
    DROP COLUMN `description`,
    DROP COLUMN `domain`,
    DROP COLUMN `password`,
    DROP COLUMN `publicStats`,
    DROP COLUMN `scaned`,
    DROP COLUMN `title`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL,
    ADD COLUMN `websiteId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Project`;

-- DropTable
DROP TABLE `SentEmail`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `VerificationToken`;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `websiteId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(280) NULL,
    `endpoint` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `scanned` BOOLEAN NOT NULL DEFAULT false,
    `scannedAt` DATETIME(3) NOT NULL,

    INDEX `Post_websiteId_idx`(`websiteId`),
    INDEX `Post_userId_idx`(`userId`),
    FULLTEXT INDEX `Post_endpoint_idx`(`endpoint`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plagiarism` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `percentage` VARCHAR(191) NOT NULL,

    INDEX `Plagiarism_postId_idx`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_stripeId_key` ON `User`(`stripeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Website_url_key` ON `Website`(`url`);

-- CreateIndex
CREATE UNIQUE INDEX `Website_key_key` ON `Website`(`key`);

-- CreateIndex
CREATE INDEX `Website_websiteId_idx` ON `Website`(`websiteId`);

-- CreateIndex
CREATE UNIQUE INDEX `Website_url_key_key` ON `Website`(`url`, `key`);

-- CreateIndex
CREATE FULLTEXT INDEX `Website_endpoint_idx` ON `Website`(`endpoint`);
