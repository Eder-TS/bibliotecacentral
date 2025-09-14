import z from 'zod';
import { livroIdSchema } from '../schemas/livroSchemas.js';

const validar = (schema) => (request, response, next) => {
  try {
    schema.parse(request.body);
    next();
  } catch (error) {
    // Tratamento da mensagem de erro para o front poder processar mais facilmente.
    let message;
    if (error instanceof z.ZodError) {
      message = error.issues
        .map((issue) => {
          return issue.message;
        })
        .join(', ');
    }
    response.status(400).json({ message });
  }
};

const validarLivroId = (request, response, next) => {
  try {
    const livroId = +request.params.id;
    livroIdSchema.parse({ id: livroId });
    next();
  } catch (error) {
    let message;
    if (error instanceof z.ZodError) {
      message = error.issues
        .map((issue) => {
          return issue.message;
        })
        .join(', ');
    }
    response.status(400).json({ message });
  }
};

export { validar, validarLivroId };
