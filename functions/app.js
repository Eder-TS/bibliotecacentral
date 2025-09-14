import express from 'express';
import serverless from 'serverless-http';
import router from '../src/routes/livroRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/.netlify/functions/app', router);

app.use((req, res) => {
  res.status(404).send({
    mensagem: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
  });
});

const lambda = serverless(app);

export async function handler(event, context) {
  return await lambda(event, context);
}
