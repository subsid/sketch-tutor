import React from 'react';
import './MetaData.css';
import Templates from '../Templates';

const threshold = 95;
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
    if (score > threshold) {
      message = "Whoop!";
    } else if (score > 65) {
      message = "Almost there!";
    } else if (score > 40) {
      message = "Keep Going!";
    } else if (score > 20){
      message = "☺✌";
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
        <div className="total">
          <span className="progress">Progress: {this.props.progressScore}%</span>
          <div className="progress-bar pt-progress-bar pt-no-stripes pt-no-animation pt-intent-success">
            <div className="pt-progress-meter" style={{"width": `${this.props.progressScore}%`}} />
          </div>
          <div className="label" style={{"marginTop": "1em", "fontSize": "2em"}}>
            {this.generateMessage(this.props.progressScore)}
          </div>
        </div>
      </div>
    );
  };
}

export default MetaData;
