import {Meteor} from 'meteor/meteor';
import {ServerMessages} from '../lib/collections';

Meteor.publish('serverMessagesPublication', function () {
  var publisher = this;

  ServerMessages.find().observeChanges({
    added: (id, fields) => {
      fields.date = new Date();
      publisher.added('serverMessages', id, fields);
    },
    removed: (id) => {
      publisher.removed('serverMessages', id);
    },
    changed: (id, fields) => {
      publisher.changed('serverMessages', id, fields);
    },
  });
});
