import React, { Component } from 'react';
import './Game.css';
import '../DrawArea/DrawArea.css';
import DrawArea from '../DrawArea/DrawArea';
import ViewArea from '../ViewArea/ViewArea';
import MetaData from '../MetaData/MetaData';
import _ from 'lodash';
import compareWithTemplate from '../compare/compare';

const generateRandomInRange = (options, start, end, except) => {
  let num = _.random(start, end);

  return (options[num] === except) ?
    generateRandomInRange(options, start, end, except) :
    options[num];
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      linesById: [],
      templates: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
      nextTemplate: 'five',
      currentTemplate: 'four',
    };
  }

  componentDidMount() {
  }

  updateLines = (id, lines) => {
    this.setState({
      linesById: [id, lines],
    });

  }

  compare = (id, lines) => {
    const score = compareWithTemplate(id, lines).toFixed(2) * 100;
    this.setState({
      score
    });
  }

  getNextTemplate(exceptTemplate) {
    const options = this.state.templates;

    return generateRandomInRange(options, 0, options.length - 1, exceptTemplate);
  }

  handleAnimationEnd = (event) => {
    this.setState((prevState) => ({
      currentTemplate: prevState.nextTemplate,
      nextTemplate: this.getNextTemplate(prevState.nextTemplate),
    }));
  }

  render() {
    return (
      <div className="Game">
        <ViewArea templateId={this.state.currentTemplate} handleAnimationEnd={this.handleAnimationEnd}/>
        <div className="noncanvasContainer">
          <MetaData
            score={this.state.score}
            nextTemplate={this.state.nextTemplate}
          />
          <DrawArea updateLines={_.debounce(this.updateLines, 1000)} templateId={this.state.currentTemplate} />
        </div>
      </div>
    );
  }
}

export default Game;
