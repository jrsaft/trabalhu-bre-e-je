import express from 'express';
import cors from 'cors';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
import dotenv from 'dotenv';

if(process.env.NODE_END !== 'production') {
    dotenv.config();
}

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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
    res.json("Produto adicionado ao carrinho");
});

app.get('/produtos-carrinho', async (req, res) => {
    const produtocar = await prisma.carrinhoItem.findMany();
    res.json(produtocar);
});

app.delete('/deletar-produto/:idProduto', async (req,res) => {
    const id = parseInt(req.params.idProduto)
    const idProduto = await prisma.carrinhoItem.deleteMany({where: { produtoId: id }})
    res.json("Produto removido do carrinho!")
})

app.listen(PORT, () => 
    console.log(`Server listening on http://localhost:${PORT}`)
)