import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import { Home, AsteroidPage, Cart } from './pages';
import {Layout} from './components'



function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/asteroid/:id" component={AsteroidPage} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
