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
// a.player1 on the road player2 not on the road
// b.player1 not on the road player2 not on the road
// c.player1 not on the road player2 on the road
// d.player1 on the road player2 on the road
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
let computerSeedsPositions = [
  {
    id: "blue-seed-2",
    position: "r7",
    color: "red",
    onroad: true,
  },
  {
    id: "blue-seed-3",
    position: "b7",
    color: "red",
    onroad: true,
  },
  {
    id: "green-seed-3",
    position: "b2",
    color: "green",
    onroad: true,
  },
];
let playerSeedsPositions = [
  {
    id: "red-seed-3",
    position: "y6",
    color: "red",
    onroad: true,
  },
  {
    id: "yellow-seed-3",
    position: "g4",
    color: "green",
    onroad: true,
  },
];
const buttons = [3,4,7]
for (let i = 0; i <= computerSeedsPositions.length - 1; i++) {
    for (let j = 0; j <= playerSeedsPositions.length - 1; j++) {
        if (computerSeedsPositions[i].id[0] === 'b') {
            const seedIndex = roadflow.blueRoad.indexOf(computerSeedsPositions[i].position);
            if (roadflow.blueRoad[seedIndex + buttons[0]] === playerSeedsPositions[j].position) {
                // move computerSeed by buttons[0]
            }
            else if (roadflow.blueRoad[seedIndex + buttons[1]] === playerSeedsPositions[j].position) {
                // move computerSeed by buttons[1]
            }
            else if (roadflow.blueRoad[seedIndex + buttons[2]] === playerSeedsPositions[j].position) {
                // move computerSeed by buttons[2]
            }
        }
  }
}

// ex:
// if currentPlayer === 'playertwo'
// check the required number needed to kill player2 seeds
// get index of computerseeds[i] and index of player1SeedPositions[i];

// button1, button2, button3
// check 'r','y','b','g'
// if 'r' check roadMap.redRoad
//

// for the computerHand
// a div or image or svg that is currently in a certain position


