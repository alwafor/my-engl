-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dictionary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "choosed" BOOLEAN NOT NULL,
    "wordsCount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TranslationToWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TranslationToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Translation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TranslationToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DictionaryToWord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DictionaryToWord_A_fkey" FOREIGN KEY ("A") REFERENCES "Dictionary" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DictionaryToWord_B_fkey" FOREIGN KEY ("B") REFERENCES "Word" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TranslationToWord_AB_unique" ON "_TranslationToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_TranslationToWord_B_index" ON "_TranslationToWord"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DictionaryToWord_AB_unique" ON "_DictionaryToWord"("A", "B");

-- CreateIndex
CREATE INDEX "_DictionaryToWord_B_index" ON "_DictionaryToWord"("B");
