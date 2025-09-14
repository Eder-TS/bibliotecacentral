import sqlite3 from 'sqlite3';

const bd = new sqlite3.Database('base_de_dados_biblioteca.db', (erro) => {
  if (erro) {
    console.log('Erro aoc onectar na base de dados: ', erro.message);
  } else {
    console.log('Base de dados da biblioteca conectada.');
  }
});

export default bd;
