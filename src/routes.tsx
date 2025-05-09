import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Aluno from './pages/Aluno';
import Livro from './pages/Livro';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alunos" element={<Aluno />} />
        {/* Você ainda vai criar os componentes abaixo */}
        <Route path="/livros" element={<Livro/>} />
        <Route path="/responsaveis" element={<div>Gerenciar Responsáveis</div>} />
        <Route path="/emprestimos" element={<div>Gerenciar Empréstimos</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
