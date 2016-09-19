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
  // filter out messages older than 500ms
  const cutTime = new Date().valueOf() - 500;
  const msgTime = fields.date.valueOf();
  if (msgTime < cutTime) {
    return;
  }

  // depending on 'type', do stuff
  if (fields.type === 'notification') {
    console.log(fields.args);
  }

  if (fields.type === 'newUser') {
    const username = fields.args;
    console.log(`Enter ${username}`);
  }

  // filter out seen messages

  // add new message id to array

}
