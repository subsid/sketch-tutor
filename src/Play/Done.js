import React, { Component } from 'react';
import {Button, Dialog} from '@blueprintjs/core';

class Done extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    };
  }

  playGame = () => {
    this.props.history.push({pathname: "/play" });
  }

  onClose = () => {
    this.props.history.push({pathname: "/"});
  }


  render() {
    return (
      <div>
        <Dialog
            iconName="inbox"
            isOpen={this.state.isOpen}
            onClose={this.onClose}
            title="Results"
        >
          <div className="pt-dialog-body">
            <div>
              <h4>Well Done! ☺👍🏼👍🏼</h4>
            </div>
          </div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button
                  onClick={this.playGame}
                  text="Play Again"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Done;
