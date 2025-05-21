import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Layout from '../components/Layout';
import './Responsavel.css';

interface Responsavel {
  id: number;
  nome: string;
}

const Responsaveis = () => {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [nome, setNome] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const fetchResponsaveis = () => {
    api.get('/responsaveis').then(res => setResponsaveis(res.data));
  };

  useEffect(() => {
    fetchResponsaveis();
  }, []);

  const salvar = () => {
    const payload = { nome};
    const req = editandoId ? api.put(`/responsaveis/${editandoId}`, payload) : api.post('/responsaveis', payload);

    req.then(() => {
      setNome('');
      setEditandoId(null);
      fetchResponsaveis();
    });
  };

  const editar = (responsavel: Responsavel) => {
    setNome(responsavel.nome);
    setEditandoId(responsavel.id);
  };

  const deletar = (id: number) => {
    api.delete(`/responsaveis/${id}`).then(fetchResponsaveis);
  };

  return (
    <Layout>
      <h2>Gerenciar Responsaveis</h2>
      <div className="form-container">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
        <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Adicionar'}</button>
      </div>

      <table className="responsavel-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {responsaveis.map(responsavel => (
            <tr key={responsavel.id}>
              <td>{responsavel.id}</td>
              <td>{responsavel.nome}</td>
              <td>
                <button className="btn edit" onClick={() => editar(responsavel)}>Editar</button>
                <button className="btn delete" onClick={() => deletar(responsavel.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Responsaveis;