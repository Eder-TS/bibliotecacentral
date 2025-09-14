import { Router } from 'express';
import livroControllers from '../controllers/livroControllers.js';
import { validar, validarLivroId } from '../middlewares/validar.js';
import { livroSchema } from '../schemas/livroSchemas.js';

const router = Router();

router.get('/livros', livroControllers.buscaTodosLivrosController);

router.get(
  '/livros/:id',
  validarLivroId,
  livroControllers.buscaLivroPorIdController,
);

router.post(
  '/livros',
  validar(livroSchema),
  livroControllers.criaLivroController,
);

router.put(
  '/livros/:id',
  validar(livroSchema),
  livroControllers.atualizaLivroController,
);

router.delete(
  '/livros/:id',
  validarLivroId,
  livroControllers.deletaLivroController,
);

export default router;
