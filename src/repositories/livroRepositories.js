import bd from '../configs/baseDeDados.js';

export async function criaLivroRepository(novoLivro) {
  const { titulo, num_paginas, isbn, editora } = novoLivro;

  const result = await bd.execute({
    sql: `
                INSERT INTO livros (titulo, num_paginas, isbn, editora)
                VALUES (?, ?, ?, ?)
            `,
    args: [titulo, num_paginas, isbn, editora],
  });
  return { id: result.lastInsertRowid, ...novoLivro };
}

export async function buscaTodosLivrosRepository() {
  const result = await bd.execute(
    'SELECT id, titulo, num_paginas, isbn, editora FROM livros',
  );
  return result.rows;
}

export async function buscaLivroPorIdRepository(livroId) {
  const result = await bd.execute({
    sql: 'SELECT * FROM livros WHERE id = ?',
    args: [livroId],
  });
  return result.rows[0] ?? null;
}

export async function atualizaLivroRepository(livroId, livroAtualizado) {
  const { titulo, num_paginas, isbn, editora } = livroAtualizado;
  await bd.execute({
    sql: `
      UPDATE livros
      SET titulo = ?, num_paginas = ?, isbn = ?, editora = ?
      WHERE id = ?
    `,
    args: [titulo, num_paginas, isbn, editora, livroId],
  });
  return {
    message: 'Livro alterado com sucesso.',
    id: livroId,
    ...livroAtualizado,
  };
}

export async function deletaLivroRepository(livroId) {
  await bd.execute({
    sql: 'DELETE FROM livros WHERE id = ?',
    args: [livroId],
  });
  return { message: 'Livro deletado com sucesso.', livroId };
}
