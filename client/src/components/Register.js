import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Отправляем данные на сервер
      const response = await axios.post('http://localhost:3001/api/register', {
        email,
        password,
        name
      });

      setName('')
      setEmail('');
      setPassword('');
      setError('Регистрация успешно завершена!');
    } catch (err) {
      if (err.response.data.message === 'Такой email уже зарегистрирован') {
        setError('Этот email уже был зарегистрирован ранее.');
      } else {
        setError(err.response.data.message || 'Что-то пошло не так');
      }
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="name"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default Register;
