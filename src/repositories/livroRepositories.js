import bd from '../configs/baseDeDados.js';

bd.run(
  `
        CREATE TABLE IF NOT EXISTS livros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            num_paginas INTEGER NOT NULL,
            isbn TEXT NOT NULL,
            editora TEXT NOT NULL
        )
    `,
);

function criaLivroRepository(novoLivro) {
  return new Promise((resolve, reject) => {
    const { titulo, num_paginas, isbn, editora } = novoLivro;

    bd.run(
      `
                INSERT INTO livros (titulo, num_paginas, isbn, editora)
                VALUES (?, ?, ?, ?)
            `,
      [titulo, num_paginas, isbn, editora],
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve({ id: this.lastID, ...novoLivro });
        }
      },
    );
  });
}

function buscaTodosLivrosRepository() {
  return new Promise((resolve, reject) => {
    bd.all(
      `
                SELECT id, titulo, num_paginas, isbn, editora
                FROM livros
            `,
      [],
      (error, rows) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      },
    );
  });
}

function buscaLivroPorIdRepository(livroId) {
  return new Promise((resolve, reject) => {
    bd.get(
      `
                SELECT *
                FROM livros
                WHERE id = ?
            `,
      [livroId],
      (error, row) => {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      },
    );
  });
}

function atualizaLivroRepository(livroId, livroAtualizado) {
  return new Promise((resolve, reject) => {
    const { titulo, num_paginas, isbn, editora } = livroAtualizado;

    bd.run(
      `
        UPDATE livros
        SET titulo = ?, num_paginas = ?, isbn = ?, editora = ?
        WHERE id = ?
      `,
      [titulo, num_paginas, isbn, editora, livroId],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            message: 'Livro alterado com sucesso.',
            id: livroId,
            ...livroAtualizado,
          });
        }
      },
    );
  });
}

function deletaLivroRepository(livroId) {
  return new Promise((resolve, reject) => {
    bd.all(
      `
                DELETE FROM livros
                WHERE id = ?
            `,
      [livroId],
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve({ message: 'Livro deletado com sucesso.', livroId });
        }
      },
    );
  });
}

export default {
  criaLivroRepository,
  buscaTodosLivrosRepository,
  buscaLivroPorIdRepository,
  atualizaLivroRepository,
  deletaLivroRepository,
};
