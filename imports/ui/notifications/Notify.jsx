import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import './Notify.scss';

export default class Notify extends Component {
  computeStyle() {
    let style = {
      position: 'fixed',
      top: '60px',
      right: '40px',
    };
    return style;
  }
  render() {
    const {message} = this.props;
    return (
      <Panel
        id="notification"
        style={this.computeStyle()}>
        {message}
      </Panel>
    );
  }
}

Notify.propTypes = {
  message: React.PropTypes.string,
};
