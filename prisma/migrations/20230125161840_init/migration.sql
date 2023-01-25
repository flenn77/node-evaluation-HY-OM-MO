/*
  Warnings:

  - You are about to drop the column `PostId` on the `TodoItem` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `PostTableId` to the `TodoItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "TodoItem" DROP CONSTRAINT "TodoItem_PostId_fkey";

-- AlterTable
ALTER TABLE "TodoItem" DROP COLUMN "PostId",
ADD COLUMN     "PostTableId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "PostTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PostTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostTable_id_key" ON "PostTable"("id");

-- AddForeignKey
ALTER TABLE "PostTable" ADD CONSTRAINT "PostTable_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_PostTableId_fkey" FOREIGN KEY ("PostTableId") REFERENCES "PostTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
