import livroRepositories from '../repositories/livroRepositories.js';

async function criaLivroService(novoLivro) {
  const livro = await livroRepositories.criaLivroRepository(novoLivro);

  if (!livro) throw new Error('Erro ao criar livro.');

  return livro;
}

async function buscaTodosLivrosService() {
  return await livroRepositories.buscaTodosLivrosRepository();
}

async function buscaLivroPorIdService(livroId) {
  const livro = await livroRepositories.buscaLivroPorIdRepository(livroId);

  if (!livro) throw new Error('Livro não encontrado.');

  return livro;
}

async function atualizaLivroService(livroId, livroAtualizado) {
  const livroExiste =
    await livroRepositories.buscaLivroPorIdRepository(livroId);
  if (!livroExiste) throw new Error('Livro não encontrado.');

  const livro = await livroRepositories.atualizaLivroRepository(
    livroId,
    livroAtualizado,
  );
  if (!livro) throw new Error('Erro ao atualizar livro.');

  return livro;
}

async function deletaLivroService(livroId) {
  const livroExiste =
    await livroRepositories.buscaLivroPorIdRepository(livroId);
  if (!livroExiste) throw new Error('Livro não encontrado.');

  return await livroRepositories.deletaLivroRepository(livroId);
}

export default {
  criaLivroService,
  buscaTodosLivrosService,
  buscaLivroPorIdService,
  atualizaLivroService,
  deletaLivroService,
};
