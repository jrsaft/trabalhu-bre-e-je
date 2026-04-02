import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Aqui acessamos o valor que está dentro do seu arquivo .env
    url: process.env["DATABASE_URL"],
  },
});