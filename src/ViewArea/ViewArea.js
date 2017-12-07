import React, { Component } from 'react';
import './ViewArea.css';
import Symbols from '../Symbols';
import Drawing from '../Drawing/Drawing';

class ViewArea extends Component {
  render() {
    return (
      <div className="viewArea">
        <div className="block">
          <Drawing lines={Symbols.chinese.four}/>
        </div>
      </div>
    );
  }
}

export default ViewArea;
