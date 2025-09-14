import livroServices from '../services/livroServices.js';

async function criaLivroController(req, res) {
  const novoLivro = req.body;

  try {
    const livro = await livroServices.criaLivroService(novoLivro);
    res.status(201).send(livro);
  } catch (erro) {
    res.status(400).send(erro.message);
  }
}

async function buscaTodosLivrosController(req, res) {
  try {
    const livros = await livroServices.buscaTodosLivrosService();
    res.send(livros);
  } catch (erro) {
    res.status(400).send(erro.message);
  }
}

async function buscaLivroPorIdController(req, res) {
  const livroId = req.params.id;
  try {
    const livro = await livroServices.buscaLivroPorIdService(livroId);
    res.send(livro);
  } catch (erro) {
    res.status(404).send(erro.message);
  }
}

async function atualizaLivroController(req, res) {
  const livroId = req.params.id;
  const livroAtualizado = req.body;

  try {
    const livro = await livroServices.atualizaLivroService(
      livroId,
      livroAtualizado,
    );
    res.send(livro);
  } catch (erro) {
    res.status(400).send(erro.message);
  }
}

async function deletaLivroController(req, res) {
  const livroId = req.params.id;

  try {
    const livroDeletado = await livroServices.deletaLivroService(livroId);
    res.send(livroDeletado);
  } catch (erro) {
    res.status(400).send(erro.message);
  }
}

export default {
  criaLivroController,
  buscaTodosLivrosController,
  buscaLivroPorIdController,
  atualizaLivroController,
  deletaLivroController,
};
