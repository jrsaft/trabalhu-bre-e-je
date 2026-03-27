import express from 'express';
import cors from 'cors';
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({url: process.env.DATABASE_URL})
const prisma = new PrismaClient({adapter});

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.json({hello:"world"});
});

app.post('/criar-produto', async (req, res) => {
    const produto = req.body;
    const produtoCriado = await prisma.produto.create({ data: produto });
    res.json(produtoCriado);
});

app.get('/produtos', async (req, res) => {
    const produtos = await prisma.produto.findMany();
    res.json(produtos);
});

app.post('/adicionar-carrinho/:idProduto', async (req, res) => {
    const id = parseInt(req.params.idProduto);
    const itemCarrinho = await prisma.carrinhoItem.create({data: {produtoId: id}});
    res.json(itemCarrinho);
});

app.listen(PORT, () => 
    console.log(`Server listening on http://localhost:${PORT}`)
)