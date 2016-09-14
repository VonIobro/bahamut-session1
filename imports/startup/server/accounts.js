import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// dimensions of playboard
// divided by 10 to force grid
// user will also not be generated on edges of board
const boardX = [ 2, 43 ];
const boardY = [ 2, 58 ];
const rotations = [ 0, 90, 180, 270 ];

// Math.floor(Math.random() * ((y-x)+1) + x);
// http://goo.gl/OfvsPH <- about random num gen
// multiplied by 10 to force grid
var randomX = () => {
  return Math.floor(Math.random() * ((boardX[1] - boardX[0]) + 1) + boardX[0]) * 10;
};
var randomY = () => {
  return Math.floor(Math.random() * ((boardY[1] - boardY[0]) + 1) + boardY[0]) * 10;
};
var randomRotation = () => {
  return rotations[
    Math.floor(Math.random() * rotations.length)
  ];
};

Accounts.onCreateUser((option, user) => {
  user.tank = {
    position: {x: randomX(), y: randomY()},
    rotation: randomRotation(),
    weaponCount: 0,
  };
  return user;
});
