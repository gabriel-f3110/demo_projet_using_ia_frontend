import { useEffect, useState } from 'react';
import { api } from '../services/api';
import Layout from '../components/Layout';
import './Emprestimo.css';

interface Emprestimo {
  id: number;
  livroTitulo: string;
  alunoNome: string;
  dataEmprestimo: Date;
  dataDevolucaoPrevista: Date;
  dataDevolucaoReal: Date | null;
  renovado: boolean;
  multa: number;
  responsavelEmprestimoNome: string;
  responsavelEmprestimoId: number;
}

const Emprestimos = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);

  const fetchEmprestimos = () => {
    api.get('/emprestimos').then(res => setEmprestimos(res.data));
  };

  useEffect(() => {
    fetchEmprestimos();
  }, []);

  const renovar = (emprestimo: Emprestimo) => {
    const payload = {
      emprestimoId: emprestimo.id,
      responsavelEmprestimoId: emprestimo.responsavelEmprestimoId,
    };

    api.post('/emprestimos/renovar', payload).then(fetchEmprestimos);
  };

  const devolver = (emprestimo: Emprestimo) => {
    const payload = {
      emprestimoId: emprestimo.id,
    };

    api.post('/emprestimos/devolver', payload).then(fetchEmprestimos);
  };

  return (
    <Layout>
      <h2>Gerenciar Empréstimos</h2>

      <table className="emprestimo-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome do Livro</th>
            <th>Nome do Aluno</th>
            <th>Data Empréstimo</th>
            <th>Data Devolução Prevista</th>
            <th>Data Devolução Real</th>
            <th>Renovado</th>
            <th>Multa</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map(emprestimo => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.id}</td>
              <td>{emprestimo.livroTitulo}</td>
              <td>{emprestimo.alunoNome}</td>
              <td>{new Date(emprestimo.dataEmprestimo + 'T00:00:00').toLocaleDateString()}</td>
              <td>{new Date(emprestimo.dataDevolucaoPrevista + 'T00:00:00').toLocaleDateString()}</td>
              <td>{emprestimo.dataDevolucaoReal ? new Date(emprestimo.dataDevolucaoReal + 'T00:00:00').toLocaleDateString() : '-'}</td>
              <td>{emprestimo.renovado ? 'Sim' : 'Não'}</td>
              <td>{emprestimo.multa.toFixed(2)}</td>
              <td>{emprestimo.responsavelEmprestimoNome}</td>
              <td>
                <button className="btn renovar" onClick={() => renovar(emprestimo)}>Renovar</button>
                <button className="btn devolver" onClick={() => devolver(emprestimo)}>Devolver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Emprestimos;
