-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `usage` INTEGER NOT NULL DEFAULT 0,
    `usageLimit` INTEGER NOT NULL DEFAULT 10,
    `plan` VARCHAR(191) NOT NULL DEFAULT 'free',
    `stripeId` VARCHAR(191) NULL,
    `billingCycleStart` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_stripeId_key`(`stripeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Website` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `websiteId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `endpoint` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Website_url_key`(`url`),
    UNIQUE INDEX `Website_key_key`(`key`),
    INDEX `Website_userId_idx`(`userId`),
    INDEX `Website_websiteId_idx`(`websiteId`),
    UNIQUE INDEX `Website_url_key_key`(`url`, `key`),
    FULLTEXT INDEX `Website_endpoint_idx`(`endpoint`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `websiteId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(280) NULL,
    `endpoint` LONGTEXT NOT NULL,
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
    `scannedAt` DATETIME(3) NOT NULL,

    INDEX `Plagiarism_postId_idx`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
