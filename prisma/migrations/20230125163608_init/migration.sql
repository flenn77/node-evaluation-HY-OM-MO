/*
  Warnings:

  - You are about to drop the `TodoItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TodoItem" DROP CONSTRAINT "TodoItem_PostTableId_fkey";

-- DropTable
DROP TABLE "TodoItem";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "PostTableId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_PostTableId_fkey" FOREIGN KEY ("PostTableId") REFERENCES "PostTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
