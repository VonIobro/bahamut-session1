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
  // filter out messages older than 5s

  // filter out seen messages

  // add new message id to array

  // depending on 'type', do stuff
}
