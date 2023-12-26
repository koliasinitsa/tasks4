import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import axios from 'axios'; 

import { useDispatch } from 'react-redux';
import { setUser } from '../actions/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory(); // Инициализация useHistory
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Отправляем данные на сервер
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      });

      // Если данные правильные, перенаправляем пользователя
      if (response.status === 200) {
        history.push('/users'); // Путь к компоненту usersTable
        dispatch(setUser(response.data));
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Что-то пошло не так');
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="needs-validation" noValidate>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}

export default Login;
