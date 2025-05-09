import React from 'react';
import Header from './Header';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
