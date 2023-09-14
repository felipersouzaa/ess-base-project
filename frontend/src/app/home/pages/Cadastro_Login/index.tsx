import { useState } from 'react';
import axios from 'axios';
import styles from "./index.module.css";

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
      <form onSubmit={handleCadastroSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={cadastroData.nome}
            onChange={handleCadastroChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cadastroData.cpf}
            onChange={handleCadastroChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={cadastroData.email}
            onChange={handleCadastroChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={cadastroData.endereco}
            onChange={handleCadastroChange}
            required
          />
        </div>
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={cadastroData.telefone}
            onChange={handleCadastroChange}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="text"
            id="senha"
            name="senha"
            value={cadastroData.senha}
            onChange={handleCadastroChange}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={loginData.senha}
            onChange={handleLoginChange}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;