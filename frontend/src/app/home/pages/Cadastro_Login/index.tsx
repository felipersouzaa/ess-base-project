import React, { useState } from 'react';
import axios from 'axios';
import styles from "./index.module.css";

// Componente reutilizável para campos de entrada
function InputField({ id, name, type, value, onChange, required, label }) {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

// Componente reutilizável para formulários
function Form({ onSubmit, children }) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

function App() {
  const [cadastroData, setCadastroData] = useState({
    nome: '',
    cpf: '',
    email: '',
    endereco: '',
    senha: '',
    telefone: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });

  const [message, setMessage] = useState('');

  const handleCadastroChange = (e) => {
    const { name, value } = e.target;
    setCadastroData({
      ...cadastroData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/cadastro/', cadastroData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.detail);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', loginData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.detail);
    }
  };

  return (
    <div className={styles.body}>
      <h2>Cadastro</h2>
      <Form onSubmit={handleCadastroSubmit}>
        <InputField
          id="nome"
          name="nome"
          type="text"
          value={cadastroData.nome}
          onChange={handleCadastroChange}
          required
          label="Nome"
        />
        <InputField
          id="cpf"
          name="cpf"
          type="text"
          value={cadastroData.cpf}
          onChange={handleCadastroChange}
          required
          label="CPF"
        />
        <InputField
          id="email"
          name="email"
          type="text"
          value={cadastroData.email}
          onChange={handleCadastroChange}
          required
          label="Email"
        />
        <InputField
          id="endereco"
          name="endereco"
          type="text"
          value={cadastroData.endereco}
          onChange={handleCadastroChange}
          required
          label="Endereço"
        />
        <InputField
          id="telefone"
          name="telefone"
          type="text"
          value={cadastroData.telefone}
          onChange={handleCadastroChange}
          required
          label="Telefone"
        />
        <InputField
          id="senha"
          name="senha"
          type="password"
          value={cadastroData.senha}
          onChange={handleCadastroChange}
          required
          label="Senha"
        />
        <button type="submit">Cadastrar</button>
      </Form>

      <h2>Login</h2>
      <Form onSubmit={handleLoginSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleLoginChange}
          required
          label="Email"
        />
        <InputField
          id="senha"
          name="senha"
          type="password"
          value={loginData.senha}
          onChange={handleLoginChange}
          required
          label="Senha"
        />
        <button type="submit">Entrar</button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
