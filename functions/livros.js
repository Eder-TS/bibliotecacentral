import livroControllers from '../src/controllers/livroControllers';

export async function handler(event, context) {
  try {
    const livros = await livroControllers.buscaTodosLivrosController();
    return {
      statusCode: 200,
      body: JSON.stringify(livros),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
