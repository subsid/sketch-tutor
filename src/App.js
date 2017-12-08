import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from './tamu_logo.jpg';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';
import './App.css';
import Play from './Play/Play';
import {Navbar, NavbarGroup, NavbarDivider, NavbarHeading} from '@blueprintjs/core';

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Navbar>
            <NavbarGroup align="left">
              <NavbarHeading>SketchTutor</NavbarHeading>
              <NavbarDivider />
              <Link className="pt-button pt-minimal pt-icon-settings" to="/play">Config</Link>
            </NavbarGroup>
            <NavbarGroup align="right">
              <img src={logo} className="App-logo" alt="logo" />
            </NavbarGroup>
          </Navbar>
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
