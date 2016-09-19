import {Meteor} from 'meteor/meteor';
import HandleServerMessages from './handleServerMessages';

export const ServerMessages = new Meteor.Collection('serverMessages');

export default function () {
  Meteor.subscribe('serverMessagesPublication');
  // Handling new messages from the server
  ServerMessages.find().observeChanges({
    added: (id, fields) => {
      HandleServerMessages(id, fields);
    }
  });
}
