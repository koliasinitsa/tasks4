import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to Home Page</h1>
      <div className="text-center">
        <ul className="list-unstyled">
          <li>
            <Link to="/login" className="btn btn-primary mb-3">Login</Link>
          </li>
          <li>
            <Link to="/register" className="btn btn-secondary mb-3">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
