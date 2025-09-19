import express from 'express';
import serverless from 'serverless-http';
import livroServices from '../src/services/livroServices.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('peidando');
    // const livros = await livroServices.buscaTodosLivrosService();
    // res.send(livros);
  } catch (erro) {
    console.log(erro);
    res.status(400).send(erro.message);
  }
});

app.use('/livros', router);

app.use((req, res) => {
  res.status(404).send({
    mensagem: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
  });
});

const lambda = serverless(app);

export async function handler(event, context) {
  return await lambda(event, context);
}
