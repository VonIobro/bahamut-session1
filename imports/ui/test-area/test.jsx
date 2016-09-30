import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import {TweenMax} from 'gsap';
import './test.scss';

export default class Test extends Component {
  constructor() {
    super();
    this.state = ({});
  }
  render() {
    return (
      <div>
        hello
        <Button>Clicky?</Button>
      </div>
    );
  }
}
