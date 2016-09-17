import {Meteor} from 'meteor/meteor';

export const ServerMessages = new Meteor.Collection(null);

Meteor.publish('serverMessagesPublication', function () {
  var publisher = this;

  ServerMessages.find().observeChanges({
    added: (id, fields) => {
      publisher.added('serverMessageCollection', id, fields);
    },
    removed: (id) => {
      publisher.removed('serverMessageCollection', id);
    },
    changed: (id, fields) => {
      publisher.changed('serverMessageCollection', id, fields);
    },
  });
});

ServerMessages.insert({type: 'blabla'});
