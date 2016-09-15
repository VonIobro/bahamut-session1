import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import './Notify.scss';

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({show: false});
    console.log('closy');
  }
  computeStyle() {
    let style = {
      position: 'fixed',
      top: '60px',
      right: '40px',
    };
    return style;
  }
  notifyStyle() {
    return 'warning';
  }
  renderAlert() {
    const {message} = this.props;
    return (
      <Alert bsStyle={this.notifyStyle()}
        id="notification"
        style={this.computeStyle()}>
        {message} <a href="#" onClick={this.handleClose}>&times;</a>
      </Alert>
    );
  }
  render() {
    const {show} = this.state;
    return (
      <span>
        {show ? this.renderAlert() : null}
      </span>
    );
  }
}

Notify.propTypes = {
  message: React.PropTypes.string,
};
