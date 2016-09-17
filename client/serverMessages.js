import {Meteor} from 'meteor/meteor';

export const ServerMessages = new Meteor.Collection('serverMessageCollection');

Meteor.subscribe('serverMessagesPublication');
// Handling new messages from the server
ServerMessages.find().observeChanges({
  added: (id, fields) => {
    HandleServerMessage(fields);
  }
});

function HandleServerMessage(fields) {
  console.log('hello ', fields);
}
