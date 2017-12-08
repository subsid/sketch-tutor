import React, { Component } from 'react';
import logo from './tamu_logo.jpg';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';
import './App.css';
import Game from './Game/Game';

class App extends Component {
  componentDidMount() {
  }

  // updateLines = () => {
  //   console.log('got called')
  //   this.setState({
  //     templateId: 'five'
  //   })
  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sketch Tutor</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
