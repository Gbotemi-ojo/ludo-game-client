// N:B :make one move at a time
// logic for computer
// player 1 is the user
// player 2 would automatically be the computer
// function computer move
// killing a player, coming out,
// get all the coordinate of player1 seed on the road in an array
// get all the coordinate of compuer seed on the road in another array
// button 1 value stored, button 2 value stored
// let player1 on the road = true || false;
// let player 2 on the road = true || false;
// 4 different scenerios
// a.player1 on the road ,player2 not on the road
// b.player1 not on the road ,player2 not on the road
// c.player1 not on the road ,player2 on the road
// d.player1 on the road ,player2 on the road
// 1 -0
// 0-0
// 0-1
// 1-1
// a function to bring computer seed on the road is needed
//scenerio a
// valid button means it contains 6
// if currentPlayer === 'playertwo && validButton'
// check the closest and farthest seeds(red or yellow) to blue and green
// comeout for the one thats farthest
// n:b when comparing for the closest and farthest, slice the roadflow.colorRoad array to remove the road coordinates responsible for safezones
// else return;
// scenerio a is complete

import roadflow from "./roadflow";

// scenerio b
// if currentplayer ==='playertwo' && validbutton
// comeout.
// else return;

// scenerio c
// if currentPlayer === 'playertwo'
// if validButton, comeout
// else the strategy should be to stay at the back of player1 before it comes out

// scenerio d

// if currentplayer === player2 && validButton
// check if computer can win player1Seed, if it can, always go for the win
// else comeout
// if coming out is not an option,strategy should be to stay at the back of player1 homebox
// if theres a computerseed that has gone past its first player1homebox, the next
// N:B

// This would be considered as positive checkpoints
// !!! there are 4 checkpoints
// The first checkpoint would be to kill the playerseed
// The second chechpoint would be to stay at the back of a playerseed (if theres one) but avoid hotspot areas(The would be 2 in total)
// The third checkpoint would be to stay at the back of a playerhome
// The fourth checkpoint would be to stay in your safe zone

// There are negative checkpoints that player2Seed needs to avoid
// The first is moving in front of player1 seed
// The second is coming out behind player1 home box

// gameplay example

let alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
let alpha = ['D','K','W'];
let beta = ['A', 'Q'];

// consider these two javascript arrays, create a function that checks alpha array elements
//  and compare it with beta array elements. The goal of the function is to try to increase just one element in beta to either
// match an element in alpha or make it come before an element in alpha.
// scenerio one
let num1 = 4;
let num2 = 6;
// The function should then change beta[0] to  indexOf alphabet[beta[0] + num1] because that would change it from ['A','Q'] to ['D','Q']
