import {Meteor} from 'meteor/meteor';

export const ServerMessages = new Meteor.Collection('serverMessageCollection');

Meteor.subscribe('serverMessagesPublication');
