import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.css';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UsersTable from './components/UsersTable';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/users" component={UsersTable} />
        {/* Другие маршруты */}
        <Route path="*" component={() => <h1>404 Not Found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;
