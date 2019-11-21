import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.css';
import Menu from './Menu';
import Home from './Home';
import Materiais from './Materiais';
import Itens from './Itens';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <nav id="menuMobile" className="navbar navbar-expand-md navbar-dark">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <Menu />
            </div>

            <a id="titulo" className="navbar-brand" href="/home">Gestão de Estoque</a>
          </nav>

          <div id="banner">
            <h1>Gestão de Estoque</h1>
          </div>

          <div className="container-fluid">

            <div className="row">

              <div id="menu" className="col-md-3">
                <Menu />
              </div>

              <div className="col-md-9">
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/materiais" component={Materiais} />
                  <Route path="/itens" component={Itens} />
                  <Redirect to="/home" />
                </Switch>
              </div>

            </div>

          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
