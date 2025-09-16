import express from 'express';
import serverless from 'serverless-http';
import livroControllers from '../src/controllers/livroControllers.js';
import cors from 'cors';

const livros = express();

livros.use(express.json());

livros.use(cors());

const router = express.Router();

router.get('/', livroControllers.buscaTodosLivrosController);

livros.use('/.netlify/functions/livros', router);

livros.use((req, res) => {
  res.status(404).send({
    mensagem: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
  });
});

const lambda = serverless(livros);

export async function handler(event, context) {
  return await lambda(event, context);
}
