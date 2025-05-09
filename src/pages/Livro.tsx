import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Layout from '../components/Layout';
import './Livro.css';

interface Livro {
  id: number;
  autor: string;
  isbn: string;
  quantidadeDisponivel: number;
  titulo: string;
}

const Livros = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autor, setAutor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('');
  const [titulo, setTitulo] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const fetchLivros = () => {
    api.get('/livros').then(res => setLivros(res.data));
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const salvar = () => {
    const payload = { autor, isbn, quantidadeDisponivel, titulo };
    const req = editandoId ? api.put(`/livros/${editandoId}`, payload) : api.post('/livros', payload);

    req.then(() => {
      setAutor('');
      setIsbn('');
      setQuantidadeDisponivel('');
      setTitulo('');
      setEditandoId(null);
      fetchLivros();
    });
  };

  const editar = (livro: Livro) => {
    setAutor(livro.autor);
    setIsbn(livro.isbn);
    setQuantidadeDisponivel(String(livro.quantidadeDisponivel));
    setTitulo(livro.titulo);
    setEditandoId(livro.id);
  };

  const deletar = (id: number) => {
    api.delete(`/livros/${id}`).then(fetchLivros);
  };

  return (
    <Layout>
      <h2>Gerenciar Livros</h2>
      <div className="form-container">
        <input value={autor} onChange={e => setAutor(e.target.value)} placeholder="Autor" />
        <input value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="Isbn" />
        <input value={quantidadeDisponivel} onChange={e => setQuantidadeDisponivel(e.target.value)} placeholder="Quantidade Disponivel" />
        <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="titulo" />
        <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Adicionar'}</button>
      </div>

      <table className="livro-table">
        <thead>
          <tr>
            <th>Autor</th>
            <th>Isbn</th>
            <th>Quantidade Disponivel</th>
            <th>Titulo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id}>
              <td>{livro.autor}</td>
              <td>{livro.isbn}</td>
              <td>{livro.quantidadeDisponivel}</td>
              <td>{livro.titulo}</td>
              <td>
                <button className="btn edit" onClick={() => editar(livro)}>Editar</button>
                <button className="btn delete" onClick={() => deletar(livro.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Livros;