import React, {Component} from 'react';

import Drawing from '../Drawing/Drawing';

class DrawArea extends Component {
  constructor() {
    super();
    this.state = {
      isDrawing: false,
      lines: [],
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseUp = () => {
    this.setState({ isDrawing: false });
  }

  handleMouseDown = (mouseEvent) => {
    if (mouseEvent.button !== 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => {
      prevState.lines.push([point]);

      return {
        lines: prevState.lines,
        isDrawing: true,
      };
    });
  }

  handleMouseMove = (mouseEvent) => {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => {
      prevState.lines[prevState.lines.length - 1].push(point);

      return {
        lines: prevState.lines
      };
    });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    };
  }

  render() {
    return (
      <div 
        className="drawArea"
        ref="drawArea"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <Drawing lines={this.state.lines} />
      </div>
    );
  }
}

export default DrawArea;
