import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import 'bootstrap-sass';

import App from '../imports/ui/App.jsx';
import subscribeServerMessages from '../imports/client/serverMessages';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
  subscribeServerMessages();
});
