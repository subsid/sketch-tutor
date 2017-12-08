import React, { Component } from 'react';
import {Slider, Checkbox, Button, Dialog} from '@blueprintjs/core';
import _ from 'lodash';
import Templates from '../Templates';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
      accuracyThreshold: 80,
      requiredAttempts: 1,
      templates: {
        'one': true,
        'two': true,
        'three': false,
        'four': false,
        'five': false,
        'six': false,
        'seven': false,
        'eight': false,
        'nine': false,
        'ten': false
      },
    };
  }

  updateTemplate = (ref, v) => {
    this.setState((prevState) => {
      prevState.templates[ref] = !prevState.templates[ref];
      return prevState;
    });
  }

  handleAccuracyTheshold = (value) => {
    this.setState({
      accuracyThreshold: value
    });
  }

  handleRequiredAttempts = (value) => {
    this.setState({
      requiredAttempts: value
    });
  }

  playGame = () => {
    this.props.history.push({pathname: "/play/game", state: {
      templates: _.toPairs(this.state.templates)
        .filter((p) => p[1])
        .map((p) => p[0]),
      accuracyThreshold: this.state.accuracyThreshold,
      requiredAttempts: this.state.requiredAttempts,
    }});
  }

  onClose = () => {
    this.props.history.push({pathname: "/"});
  }

  render() {
    const checkBoxes = _.keys(this.state.templates).map((t, i) => {
      return (
        <Checkbox key={i} checked={this.state.templates[t]} label={Templates.chinese_beautified[t]} onChange={this.updateTemplate.bind(this, t)} />
      );
    });
    return (
      <div>
        <Dialog
            iconName="inbox"
            isOpen={this.state.isOpen}
            onClose={this.onClose}
            title="Settings"
        >
          <div className="pt-dialog-body">
            <div>
              <h4>Select Symbols</h4>
              {checkBoxes}
            </div>
            <div>
              <h4>Minimum Attempts</h4>
	      <Slider
		  min={1}
		  max={100}
		  stepSize={1}
		  labelStepSize={10}
		  onChange={this.handleRequiredAttempts}
		  value={this.state.requiredAttempts}
	      />
            </div>
            <div>
              <h4>Goal</h4>
	      <Slider
		  min={0}
		  max={100}
		  stepSize={0.5}
		  labelStepSize={10}
		  onChange={this.handleAccuracyTheshold}
		  value={this.state.accuracyThreshold}
	      />
            </div>
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button
                  onClick={this.playGame}
                  text="Play"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Config;
