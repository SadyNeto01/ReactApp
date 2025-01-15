import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-background">
      <div className="login-form-container">
        <h2 className="login-title">Bem-vindo</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login-input"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
