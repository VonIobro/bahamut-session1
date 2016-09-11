import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// dimensions of playboard
var boardX = [ 0, 200 ];
var boardY = [ 0, 200 ];

// http://goo.gl/OfvsPH <- about random num gen
var randomX = () => {
  return Math.floor(Math.random() * ((boardX[1] - boardX[0]) + 1) + boardX[1]);
};
var randomY = () => {
  return Math.floor(Math.random() * ((boardY[1] - boardY[0]) + 1) + boardY[1]);
};
var randomDeg = () => {
  return Math.floor(Math.random() * ((360 - 0) + 1) + 360);
};

Accounts.onCreateUser((option, user) => {
  user.tank = {
    position: {X: randomX(), Y: randomY()},
    rotation: randomDeg(),
  };
  return user;
});
