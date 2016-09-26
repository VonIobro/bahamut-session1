import _ from 'lodash';
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Alert} from 'react-bootstrap';
import './Notify.scss';

class NotifyMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: true};
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({visible: true});
    }
  }
  componentDidMount() {
    this.setTimer();
  }
  handleClose(msgId) {
    const {onHandleClose} = this.props;
    this.setState({visible: false});
    onHandleClose(msgId);
  }
  setTimer() {
    const {delay} = this.props;
    // clear any existing timer
    timer != null ? clearTimeout(timer) : null;
    // hide after 'delay' miliseconds
    timer = setTimeout(() => {
      this.setState({visible: false});
      this._timer = null;
    }, delay);
  }
  componentWillUnmount() {
    clearTimeout(this._timer);
  }
  render() {
    const {message} = this.props;
    const {visible} = this.state;
    var component;
    if (visible) {
      component = (
          <Alert bsStyle={message.style ? message.style : 'warning'}
            key={message._id}>
            {message.text}
            <a href="#" onClick={() => this.handleClose(message._id)}> &times;</a>
          </Alert>
      );
    }
    return (
      <ReactCSSTransitionGroup
        transitionName="note"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {component}
      </ReactCSSTransitionGroup>
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
    return curMessages.forEach(message => {
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
        {this.alertNodes()}
      </span>
    );
  }
}

Notify.propTypes = {
  message: React.PropTypes.object,
};
