/*
  Warnings:

  - You are about to drop the column `userId` on the `Hobby` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_HobbyToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Hobby" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hobby" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL
);
INSERT INTO "new_Hobby" ("active", "id", "image", "title") SELECT "active", "id", "image", "title" FROM "Hobby";
DROP TABLE "Hobby";
ALTER TABLE "new_Hobby" RENAME TO "Hobby";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_HobbyToUser_AB_unique" ON "_HobbyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_HobbyToUser_B_index" ON "_HobbyToUser"("B");
