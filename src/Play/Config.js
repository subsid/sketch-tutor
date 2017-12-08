import React, { Component } from 'react';
import {Checkbox, Button, Dialog} from '@blueprintjs/core';
import _ from 'lodash';
import Templates from '../Templates';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
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

  playGame = () => {
    this.props.history.push({pathname: "/play/game", state: {
      templates: _.toPairs(this.state.templates)
        .filter((p) => p[1])
        .map((p) => p[0]),
    }});
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
            title="Settings"
        >
          <div className="pt-dialog-body">
            <div>
              <h4>Select Symbols</h4>
              {checkBoxes}
            </div>
            <div>
              <h4>Select Level</h4>
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
