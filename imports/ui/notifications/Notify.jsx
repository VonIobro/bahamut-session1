import _ from 'lodash';
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Alert} from 'react-bootstrap';
import './Notify.scss';

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curMessages: [],
    };
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {message} = this.props;
    const {curMessages} = this.state;
    // return if no new messages
    if (!nextProps.message) {
      return;
    }
    // ensure unique messages
    const msgId = nextProps.message._id;
    if (!_.includes(message, msgId)) {
      curMessages.push(nextProps.message);
      this.setState({curMessages});
    }
  }
  handleClose(msgId) {
    // remove dismissedMsgs from array
    const {curMessages} = this.state;
    const indexToRemove = _.findIndex(curMessages, {_id: msgId});
    curMessages.splice(indexToRemove, 1);
    this.setState({curMessages});
  }
  alertNodes() {
    const {curMessages} = this.state;
    return curMessages.map(message => {
      return (
        <Alert bsStyle={message.style ? message.style : 'warning'}
          key={message._id}>
          {message.text}
          <a href="#" onClick={() => this.handleClose(message._id)}> &times;</a>
        </Alert>
      );
    });
  }
  render() {
    const {curMessages} = this.state;
    if (curMessages === []) {
      return <span>why</span>;
    }
    return (
      <span id="notifications">
        <ReactCSSTransitionGroup
          transitionName="note"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {this.alertNodes()}
        </ReactCSSTransitionGroup>
      </span>
    );
  }
}

Notify.propTypes = {
  message: React.PropTypes.object,
};
