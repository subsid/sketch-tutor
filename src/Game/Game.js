import React, { Component } from 'react';
import './Game.css';
import '../DrawArea/DrawArea.css';
import DrawArea from '../DrawArea/DrawArea';
import ViewArea from '../ViewArea/ViewArea';
import MetaData from '../MetaData/MetaData';
import _ from 'lodash';
import compareWithTemplate from '../compare/compare';

const generateRandomInRange = (options, start, end, except, count=1) => {
  if (options.length === 1) {
    return options[0];
  }
  let num = _.random(start, end);

  return (options[num] === except) ?
    generateRandomInRange(options, start, end, except, 2) :
    options[num];
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.attempts = 0;
    // TODO :: Handle this better.
    //         It is used by DrawArea to clear correctly.
    this.state = {
      score: 0,
      linesById: [],
      progressScore: 0,
      templateCount: 0,
    };
    this.state.templates = this.props.location.state ?
      this.props.location.state.templates || ['one', 'two'] :
      ['one', 'two'];
    this.state.accuracyThreshold = this.props.location.state ?
      this.props.location.state.accuracyThreshold || 80 :
      80;
    this.state.requiredAttempts = this.props.location.state ?
      this.props.location.state.requiredAttempts || 10 :
      10;
    this.state.currentTemplate = this.state.templates[0];
    this.state.nextTemplate = this.state.templates[1] || this.state.templates[0];
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
    if (options.length === 1) {
      return options[0]
    } else {
      return generateRandomInRange(options, 0, options.length - 1, exceptTemplate);
    }
  }

  computeProgress(allScores) {
    const scores = _.values(allScores);
    const nonZeros = _.filter(scores, (v) => v > 0);

    let seenSymbolsScore = (nonZeros.length/scores.length) * 10;
    let attemptsScore =  Math.min((this.attempts/this.state.requiredAttempts), 1)  * 10;
    let accuracyScore = Math.min((_.sum(scores)/(0.8 * 100 * scores.length)), 1) * 80;
    const total = Math.round(accuracyScore + seenSymbolsScore + attemptsScore);

    if ((seenSymbolsScore > 9) && (attemptsScore > 9) && (total > this.state.accuracyThreshold)) {
      this.props.history.push({
        pathname: '/play/done',
        allScores: this.state.allScores
      });
    }
    return total;
  }

  handleAnimationEnd = (event) => {
    this.attempts += 1;
    this.setState((prevState) => {
      const score = this.compare(prevState.linesById);
      prevState.allScores[prevState.linesById[0]] = score;
      prevState.seen[prevState.currentTemplate] = true;
      return {
        seen: prevState.seen,
        currentTemplate: prevState.nextTemplate,
        nextTemplate: this.getNextTemplate(prevState.nextTemplate),
        templateCount: prevState.templateCount + 1,
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
          <DrawArea updateLines={_.debounce(this.updateLines, 500)} templateId={this.state.currentTemplate} templateCount={this.state.templateCount}/>
        </div>
      </div>
    );
  }
}

export default Game;
