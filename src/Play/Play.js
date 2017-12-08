import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Game from '../Game/Game';
import Config from './Config';
import Done from './Done';

class Play extends Component {
  render() {
    return (
      <div className="Play">
        <Route exact path="/play" component={Config}/>
        <Route path="/play/game" component={Game}/>
        <Route path="/play/done" component={Done}/>
      </div>
    );
  }
}

export default Play;
