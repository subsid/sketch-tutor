import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './DrawArea/DrawArea.css';
import DrawArea from './DrawArea/DrawArea';
import ViewArea from './ViewArea/ViewArea';

class App extends Component {
  componentDidMount() {
  }

        // <header className="App-header">
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <h1 className="App-title">Welcome to React</h1>
        // </header>
  render() {
    return (
      <div className="App">
        <ViewArea />
        <div className="noncanvasContainer">
          <div className="metaInfo">
            Score Info
          </div>
          <DrawArea />
        </div>
      </div>
    );
  }
}

export default App;
