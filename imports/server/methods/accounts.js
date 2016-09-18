import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {ai} from '/imports/ui/app_info';

// area of playboard to generate user
// divided by 10 to force grid
// user will also generated on edges of board
let boardX = [];
boardX[0] = (ai.boardX[0] / ai.grid) + 2;
boardX[1] = (ai.boardX[1] / ai.grid) - 2;
let boardY = [];
boardY[0] = (ai.boardY[0] / ai.grid) + 2;
boardY[1] = (ai.boardY[1] / ai.grid) - 2;
const rotations = [ 0, 90, 180, 270 ];

// Math.floor(Math.random() * ((y-x)+1) + x);
// http://goo.gl/OfvsPH <- about random num gen
// multiplied by 10 to force grid
var randomX = () => {
  return Math.floor(Math.random() * ((boardX[1] - boardX[0]) + 1) + boardX[0]) * ai.grid;
};
var randomY = () => {
  return Math.floor(Math.random() * ((boardY[1] - boardY[0]) + 1) + boardY[0]) * ai.grid;
};
var randomRotation = () => {
  return rotations[
    Math.floor(Math.random() * rotations.length)
  ];
};

Accounts.onCreateUser((option, user) => {
  console.log(user.username)
  Meteor.call('serverMessages.newUser', user.username);
  user.tank = {
    health: 3,
    position: {x: randomX(), y: randomY()},
    rotation: randomRotation(),
  };
  return user;
});
