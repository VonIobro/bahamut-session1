import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// dimensions of playboard
const boardX = [ 0, 450 ];
const boardY = [ 0, 600 ];
const rotations = [ 0, 90, 180, 270 ];

// Math.floor(Math.random() * ((y-x)+1) + x);
// http://goo.gl/OfvsPH <- about random num gen
var randomX = () => {
  return Math.floor(Math.random() * ((boardX[1] - boardX[0]) + 1) + boardX[0]);
};
var randomY = () => {
  return Math.floor(Math.random() * ((boardY[1] - boardY[0]) + 1) + boardY[0]);
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
  };
  return user;
});
