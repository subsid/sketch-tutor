import React, { Component } from 'react';
import './ViewArea.css';
import Templates from '../Templates';

class ViewArea extends Component {
  render() {
    return (
      <div className="viewArea">
        <div className="block" ref="block" onAnimationIteration={this.props.handleAnimationEnd}>
          {Templates.chinese_beautified[this.props.templateId]}
        </div>
      </div>
    );
  };
}

export default ViewArea;
