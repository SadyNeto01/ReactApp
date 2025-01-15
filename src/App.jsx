import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import BackOffice from './components/BackOffice';
import FrontOffice from './components/FrontOffice';

const App = () => {
  const [userRole, setUserRole] = useState(null); // Estado para o papel do usuário (admin ou user)
  const [username, setUsername] = useState(null); // Estado para o nome do usuário logado

  // Verifica se há uma sessão salva no localStorage ao carregar a página
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedUsername = localStorage.getItem('username');
    if (savedRole && savedUsername) {
      setUserRole(savedRole);
      setUsername(savedUsername);
    }
  }, []);

  // Função de login
  const handleLogin = (username, password) => {
    if (password === 'password') {
      if (username === 'admin') {
        setUserRole('admin');
        setUsername(username);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('username', username);
      } else if (username === 'user') {
        setUserRole('user');
        setUsername(username);
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('username', username);
      } else {
        alert('Usuário inválido!');
      }
    } else {
      alert('Senha incorreta!');
    }
  };

  // Função de logout
  const handleLogout = () => {
    setUserRole(null);
    setUsername(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
  };

  // Cabeçalho com nome do usuário logado e botão de logout
  const Header = () => (
    <header style={headerStyle}>
      <div>
        <strong>Logado como:</strong> {username}
      </div>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Sair
      </button>
    </header>
  );

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
  };

  const logoutButtonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      {userRole ? (
        <>
          <Header />
          {userRole === 'admin' ? <BackOffice /> : <FrontOffice />}
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
