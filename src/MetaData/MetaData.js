import React from 'react';
import './MetaData.css';
import Templates from '../Templates';
import _ from 'lodash';

const threshold = 60;
class MetaData extends React.Component {
  handleAnimationEnd = () => {
    this.refs.score.className = 'score';
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.score !== this.props.score)) {
      this.refs.score.className = 'score score-animate';
    }
  }

  generateMessage(score) {
    let message = '';
    if (score > 95) {
      message = "Whoop!";
    } else if (score > 65) {
      message = "Almost there!";
    } else if (score > 40) {
      message = "Keep Going!";
    } else if (score > 20){
      message = "☺✌"
    } else {
      message = "Get started :)";
    }
    return message;
  }

  render() {
    return (
      <div className="metaData">
        <div ref="score" className='score score-animate' onAnimationEnd={this.handleAnimationEnd}>
        <span className="label">Score:&nbsp;</span>
        {this.props.score}<span className="label">%</span>
        </div>
        <div className="nextTemplate">
          <span className="label">Next:&nbsp;</span>
          {Templates.chinese_beautified[this.props.nextTemplate]}
        </div>
        <div className="pt-progress-bar pt-no-stripes pt-no-animation pt-intent-success">
          <div className="pt-progress-meter" style={{"width": `${this.props.progressScore}%`}} />
        </div>
        <div className="label" style={{"fontSize": "2em"}}>
          {this.generateMessage(this.props.progressScore)}
        </div>
      </div>
    );
  };
}

export default MetaData;
