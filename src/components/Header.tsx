import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <header className="header">
      <h1><Link to="/">Sistema Biblioteca</Link></h1>
      <nav>
        <ul>
          <li><Link to="/alunos" className={getLinkClass('/alunos')}>Alunos</Link></li>
          <li><Link to="/livros" className={getLinkClass('/livros')}>Livros</Link></li>
          <li><Link to="/responsaveis" className={getLinkClass('/responsaveis')}>Responsáveis</Link></li>
          <li><Link to="/emprestimos" className={getLinkClass('/emprestimos')}>Empréstimos</Link></li>
        </ul>
      </nav>
    </header>
  );
};


export default Header;