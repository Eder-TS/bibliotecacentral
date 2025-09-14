import { z } from 'zod';

const livroSchema = z.object({
  titulo: z
    .string('O título deve ser uma string.')
    .min(1, 'Título é obrigatório.'),
  num_paginas: z
    .number('Número de páginas deve ser um número.')
    .int('Número de páginas deve ser um número inteiro.')
    .min(1, 'Pages is required.'),
  isbn: z
    .string('ISBN deve ser uma string.')
    .regex(
      /^(?:\d{9}[\dX]|\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?[\dX])$/,
      'ISBN inválido.',
    ),
  editora: z
    .string('Editora deve ser uma string.')
    .min(1, 'Editora é obrigatória.'),
});

const livroIdSchema = z.object({
  id: z
    .number('id deve ser um número.')
    .int('id deve ser um número inteiro.')
    .positive('id deve ser um número inteiro positivo.'),
});

export { livroSchema, livroIdSchema };
