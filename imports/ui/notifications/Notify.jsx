import _ from 'lodash';
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Alert} from 'react-bootstrap';
import './Notify.scss';

class NotifyMessage extends Component {
  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
    }
  }
  componentDidMount() {
    this.setTimer();
  }
  setTimer() {
    const {delay, message, onHandleClose} = this.props;
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;
    // hide after 'delay' miliseconds
    this._timer = setTimeout(() => {
      onHandleClose(message.id);
      this._timer = null;
    }, delay);
  }
  componentWillUnmount() {
    clearTimeout(this._timer);
  }
  render() {
    const {message, onHandleClose} = this.props;
    return (
      <Alert bsStyle={message.style ? message.style : 'warning'}
        key={message._id}>
        {message.text}
        <a href="#" onClick={() => onHandleClose(message._id)}> &times;</a>
      </Alert>
    );
  }
}

export default class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curMessages: [],
    };
    this.onHandleClose = this.onHandleClose.bind(this);
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
  onHandleClose(msgId) {
    // remove dismissedMsgs from array
    const {curMessages} = this.state;
    const indexToRemove = _.findIndex(curMessages, {_id: msgId});
    curMessages.splice(indexToRemove, 1);
    this.setState({curMessages});
  }
  alertNodes() {
    const {curMessages} = this.state;
    const delay = 3000;
    return curMessages.map(message => {
      return (
        <NotifyMessage
          delay={delay}
          message={message}
          onHandleClose={this.onHandleClose}>
        </NotifyMessage>
      );
    });
  }
  render() {
    const {curMessages} = this.state;
    if (curMessages === []) {
      return <span/>;
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
