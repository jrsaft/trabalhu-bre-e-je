/*
  Warnings:

  - You are about to drop the column `quantidade` on the `CarrinhoItem` table. All the data in the column will be lost.
  - You are about to alter the column `preco` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CarrinhoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "CarrinhoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CarrinhoItem" ("id", "produtoId") SELECT "id", "produtoId" FROM "CarrinhoItem";
DROP TABLE "CarrinhoItem";
ALTER TABLE "new_CarrinhoItem" RENAME TO "CarrinhoItem";
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "imagemUrl" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Produto" ("createdAt", "descricao", "id", "imagemUrl", "nome", "preco") SELECT "createdAt", "descricao", "id", "imagemUrl", "nome", "preco" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
