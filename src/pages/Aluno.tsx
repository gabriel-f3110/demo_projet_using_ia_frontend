import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Layout from '../components/Layout';
import './Aluno.css';

interface Aluno {
  id: number;
  nome: string;
  matricula: string;
}

const Alunos = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const fetchAlunos = () => {
    api.get('/alunos').then(res => setAlunos(res.data));
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const salvar = () => {
    const payload = { nome, matricula };
    const req = editandoId ? api.put(`/alunos/${editandoId}`, payload) : api.post('/alunos', payload);

    req.then(() => {
      setNome('');
      setMatricula('');
      setEditandoId(null);
      fetchAlunos();
    });
  };

  const editar = (aluno: Aluno) => {
    setNome(aluno.nome);
    setMatricula(aluno.matricula);
    setEditandoId(aluno.id);
  };

  const deletar = (id: number) => {
    api.delete(`/alunos/${id}`).then(fetchAlunos);
  };

  return (
    <Layout>
      <h2>Gerenciar Alunos</h2>
      <div className="form-container">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
        <input value={matricula} onChange={e => setMatricula(e.target.value)} placeholder="Matrícula" />
        <button onClick={salvar}>{editandoId ? 'Atualizar' : 'Adicionar'}</button>
      </div>

      <table className="aluno-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.matricula}</td>
              <td>
                <button className="btn edit" onClick={() => editar(aluno)}>Editar</button>
                <button className="btn delete" onClick={() => deletar(aluno.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Alunos;