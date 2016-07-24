import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updatePosition, releasePad } from '../../ducks/x-y-pad.duck';
import XYPadAxisLabel from '../XYPadAxisLabel';
import './index.scss';

export class XYPad extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleRelease = this.handleRelease.bind(this);
  }

  handleClick(ev) {
    // If, and only if, the mouse button is held down, we want to delegate
    // to the `touch` event.
    if (ev.buttons === 1) {
      this.handlePress(ev);
    }
  }

  handlePress(ev) {
    // We need to calculate the relative position of the event, and pass it
    // onto our supplied touch handler.
    const boundingBox = this.elem.getBoundingClientRect();

    const x = (ev.clientX - boundingBox.left) / boundingBox.width;
    const y = (ev.clientY- boundingBox.top) / boundingBox.height;

    this.props.updatePosition({ x, y });
  }

  handleRelease() {
    this.props.releasePad();
  }

  render() {
    return (
      <div className="x-y-pad">
        <div
          className="pad"
          ref={elem => { this.elem = elem; }}
          onTouchStart={this.handlePress}
          onMouseDown={this.handlePress}
          onMouseMove={this.handleClick}
          onTouchEnd={this.handleRelease}
          onMouseUp={this.handleRelease}
        />
        <XYPadAxisLabel
          label="low-pass filter"
          className="horizontal-axis"
          includeRightArrow
        />
        <XYPadAxisLabel
          label="distortion"
          className="vertical-axis"
          includeLeftArrow
          />
      </div>
    );
  }
}

XYPad.propTypes = {
  updatePosition: PropTypes.func.isRequired,
  releasePad: PropTypes.func.isRequired,
};

export default connect(null, { updatePosition, releasePad })(XYPad);
