import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import { Home, AsteroidPage, Cart } from './pages';



function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/asteroid/:id" component={AsteroidPage} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
