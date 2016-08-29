import React, { Component } from 'react';
import LayoutA1 from './layouts/LayoutA1.jsx';
import LayoutB1 from './layouts/LayoutB1.jsx';
import LayoutC1 from './layouts/LayoutC1.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <LayoutA1 />
        <LayoutB1 />
        <LayoulC1 />
      </div>
    );
  }
}
