import {Meteor} from 'meteor/meteor';

export const ServerMessages = new Meteor.Collection('serverMessages');

export default function () {
  Meteor.subscribe('serverMessagesPublication');
  // Handling new messages from the server
  ServerMessages.find().observeChanges({
    added: (id, fields) => {
      HandleServerMessage(id, fields);
    }
  });
}

function HandleServerMessage(id, fields) {
  console.log('id', id);
  console.log('hello ', fields);
}
