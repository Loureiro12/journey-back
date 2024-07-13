-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "occurs_at" DATETIME NOT NULL,
    "tripeId" TEXT NOT NULL,
    CONSTRAINT "activities_tripeId_fkey" FOREIGN KEY ("tripeId") REFERENCES "trips" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tripeId" TEXT NOT NULL,
    CONSTRAINT "links_tripeId_fkey" FOREIGN KEY ("tripeId") REFERENCES "trips" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
