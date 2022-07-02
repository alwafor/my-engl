/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Dictionary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[translation]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[word]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_name_key" ON "Dictionary"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_translation_key" ON "Translation"("translation");

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");
