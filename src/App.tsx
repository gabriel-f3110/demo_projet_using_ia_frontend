import React from 'react';
import Aluno from './pages/Aluno';
import Livro from './pages/Livro';

const App: React.FC = () => {
  return (
    <div>
      <h1>Sistema Biblioteca</h1>
      <Aluno />
      <Livro />
    </div>
  );
};

export default App;
