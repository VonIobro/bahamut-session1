import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import {TimelineMax, TweenMax} from 'gsap';
import './test.scss';

export default class Test extends Component {
  constructor() {
    super();
    this.state = ({});
  }
  componentDidMount() {
    this.tl = new TimelineMax();
    this.tl.to('#circleTop', 1, { left: 100 })
      .to('#circleBottom', 1, { top: 100 });
  }
  render() {
    return (
      <div id="testarea">
        <div id="circleTop" className="circle"></div>
        <div id="circleBottom" className="circle"></div>
        <Button>Clicky?</Button>
      </div>
    );
  }
}
