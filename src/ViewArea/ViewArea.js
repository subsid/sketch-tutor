import React, { Component } from 'react';
import './ViewArea.css';
import Templates from '../Templates';
import Drawing from '../Drawing/Drawing';

class ViewArea extends Component {
  render() {
    return (
      <div className="viewArea">
        <div className="block">
          <Drawing lines={Templates.chinese.four}/>
        </div>
      </div>
    );
  }
}

export default ViewArea;
