import React, { Component } from 'react';
import LayoutA1 from './layouts/LayoutA1.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <LayoutA1 />
        <LayoutB1 />
        <LayoutC1 />
      </div>
    );
  }
}
