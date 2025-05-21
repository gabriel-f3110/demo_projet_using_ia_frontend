import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Aluno from './pages/Aluno';
import Livro from './pages/Livro';
import Responsavel from './pages/Responsavel';
import Emprestimo from './pages/Empresitmo';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alunos" element={<Aluno />} />
        {/* Você ainda vai criar os componentes abaixo */}
        <Route path="/livros" element={<Livro/>} />
        <Route path="/responsaveis" element={<Responsavel/>} />
        <Route path="/emprestimos" element={<Emprestimo/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
