import React, { Component } from 'react';
import './Game.css';
import '../DrawArea/DrawArea.css';
import DrawArea from '../DrawArea/DrawArea';
import ViewArea from '../ViewArea/ViewArea';
import MetaData from '../MetaData/MetaData';
import _ from 'lodash';
import compareWithTemplate from '../compare/compare';

const generateRandomInRange = (options, start, end, except, count=1) => {
  let num = _.random(start, end);

  return (options[num] === except) ?
    generateRandomInRange(options, start, end, except, 2) :
    options[num];
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      linesById: [],
      templates: ['one', 'two'],
      progressScore: 0,
    };
    this.state.currentTemplate = this.state.templates[0];
    this.state.nextTemplate = this.state.templates[1];
    this.state.allScores = _.fromPairs(this.state.templates.map((t) => [t, 0]));
    this.state.seen = _.fromPairs(this.state.templates.map((t) => [t, false]));
  }

  updateLines = (id, lines) => {
    this.setState({
      linesById: [id, lines],
    });
  }

  compare = (linesById) => {
    if (_.isEmpty(linesById)) {
      return 0;
    }
    return Math.round(compareWithTemplate(linesById[0], linesById[1]) * 100);
  }

  getNextTemplate(exceptTemplate) {
    const options = this.state.templates;

    return _.findKey(this.state.seen, (k, n) => (k === false) && ( n !== exceptTemplate)) ||
      generateRandomInRange(options, 0, options.length - 1, exceptTemplate);
  }

  computeProgress(allScores) {
    const scores = _.values(allScores);
    const nonZeros = _.filter(scores, (v) => v > 0);

    let seenSymbolsScore = Math.round((nonZeros.length/scores.length) * 10);
    let accuracyScore = (_.sum(scores)/(100 * scores.length)) * 90;

    return seenSymbolsScore;
  }

  handleAnimationEnd = (event) => {
    this.setState((prevState) => {
      const score = this.compare(prevState.linesById);
      prevState.allScores[prevState.linesById[0]] = score;
      prevState.seen[prevState.currentTemplate] = true;
      return {
        seen: prevState.seen,
        currentTemplate: prevState.nextTemplate,
        nextTemplate: this.getNextTemplate(prevState.nextTemplate),
        score: score,
        allScores: prevState.allScores,
        progressScore: this.computeProgress(prevState.allScores),
      };
    });
  }

  render() {
    return (
      <div className="Game">
        <ViewArea templateId={this.state.currentTemplate} handleAnimationEnd={this.handleAnimationEnd}/>
        <div className="noncanvasContainer">
          <MetaData
            score={this.state.score}
            nextTemplate={this.state.nextTemplate}
            allScores={this.state.allScores}
            progressScore={this.state.progressScore}
          />
          <DrawArea updateLines={_.debounce(this.updateLines, 500)} templateId={this.state.currentTemplate} />
        </div>
      </div>
    );
  }
}

export default Game;
