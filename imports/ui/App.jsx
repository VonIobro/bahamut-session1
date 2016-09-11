import React, { Component } from 'react';

import PlayArea from './play-area/PlayArea';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <PlayArea />
      </div>
    );
  }
}
