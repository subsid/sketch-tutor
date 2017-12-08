import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './tamu_logo.jpg';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';
import './App.css';
import Play from './Play/Play';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sketch Tutor</h1>
        </header>
        <Switch>
          <Route path="/play" component={Play} />
        </Switch>
      </div>
    );
  }
}

// <Route path="/Practice" component={Practice}/>
export default App;
