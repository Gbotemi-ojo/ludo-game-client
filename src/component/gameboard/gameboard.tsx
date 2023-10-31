import React from "react";
import { useEffect, useState, useRef } from "react";
import "./gameboard.css";
import Dice from "../dice/dice";
import roadflow from "./roadflow";

function Gameboard() {
  const [clicked, setClicked] = useState("");
  const button3AutoClick = useRef(null);
  const moveSeedRef = useRef(null);
  const getRandomNumber = (): number => {
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    return randomNumber;
  };

  const [dieValue1, setDieValue1] = useState({
    num: 1,
    className: "die_1 die",
  });
  const [dieRolling1, setdieRolling1] = useState(false);
  const handleDie1 = (): void => {
    if (dieRolling1) {
      return;
    }
    setdieRolling1(true);
    const randomNumber = getRandomNumber();
    setDieValue1({
      num: 6,
      className: `die_${randomNumber} die rotate-center`,
    });
    setTimeout(() => {
      setDieValue1({
        num: randomNumber,
        className: `die_${randomNumber} die`,
      });
      setdieRolling1(false);
      setButton1Value(randomNumber);
      const randomUUID = crypto.randomUUID();
      setClicked(randomUUID);
    }, 2000);
  };

  const [dieValue2, setDieValue2] = useState({
    num: 1,
    className: "die_1 die",
  });

  const [dieRolling2, setdieRolling2] = useState(false);
  const handleDie2 = () => {
    if (dieRolling2 === true) {
      return;
    }
    setdieRolling2(true);
    const randomNumber = getRandomNumber();
    setDieValue2({
      num: 6,
      className: `die_${randomNumber} die rotate-center`,
    });
    setTimeout(() => {
      setDieValue2({
        num: randomNumber,
        className: `die_${randomNumber} die`,
      });
      setdieRolling2(false);
      setButton2Value(randomNumber);
      const randomUUID = crypto.randomUUID();
      setClicked(randomUUID);
    }, 2000);
  };

  const [button1Value, setButton1Value] = useState(dieValue1.num);
  const [button2Value, setButton2Value] = useState(dieValue2.num);
  const [button3Value, setButton3Value] = useState(button1Value + button2Value);
  const updateButton3Value = () => {
    setButton3Value(button1Value + button2Value);
  };
  useEffect(() => {
    updateButton3Value();
  });

  // logic for the dom;

  const redRoadMap: string[] = [];
  const yellowRoadMap: string[] = [];
  const greenRoadMap: string[] = [];
  const blueRoadMap: string[] = [];
  const generateRoadMaps = () => {
    for (let i = 1; i <= 18; i++) {
      redRoadMap.push(`r${i}`);
      yellowRoadMap.push(`y${i}`);
      greenRoadMap.push(`g${i}`);
      blueRoadMap.push(`b${i}`);
    }
  };

  function isPlayer1Valid() {
    const redSeed1Coordinate = seeds[0].position;
    const redSeed2Coordinate = seeds[1].position;
    const redSeed3Coordinate = seeds[2].position;
    const redSeed4Coordinate = seeds[3].position;

    const yellowSeed1Coordinate = seeds[4].position;
    const yellowSeed2Coordinate = seeds[5].position;
    const yellowSeed3Coordinate = seeds[6].position;
    const yellowSeed4Coordinate = seeds[7].position;

    const blueSeed1Coordinate = seeds[8].position;
    const blueSeed2Coordinate = seeds[9].position;
    const blueSeed3Coordinate = seeds[10].position;
    const blueSeed4Coordinate = seeds[11].position;

    const greenSeed1Coordinate = seeds[12].position;
    const greenSeed2Coordinate = seeds[13].position;
    const greenSeed3Coordinate = seeds[14].position;
    const greenSeed4Coordinate = seeds[15].position;

    if (currentPlayer === "playerOne") {
      if (
        roadflow.redRoad.includes(redSeed1Coordinate) ||
        roadflow.redRoad.includes(redSeed2Coordinate) ||
        roadflow.redRoad.includes(redSeed3Coordinate) ||
        roadflow.redRoad.includes(redSeed4Coordinate) ||
        roadflow.yellowRoad.includes(yellowSeed1Coordinate) ||
        roadflow.yellowRoad.includes(yellowSeed2Coordinate) ||
        roadflow.yellowRoad.includes(yellowSeed3Coordinate) ||
        roadflow.yellowRoad.includes(yellowSeed4Coordinate)
      ) {
        return true;
      }
    } else if (currentPlayer === "playerTwo") {
      if (
        roadflow.blueRoad.includes(blueSeed1Coordinate) ||
        roadflow.blueRoad.includes(blueSeed2Coordinate) ||
        roadflow.blueRoad.includes(blueSeed3Coordinate) ||
        roadflow.blueRoad.includes(blueSeed4Coordinate) ||
        roadflow.greenRoad.includes(greenSeed1Coordinate) ||
        roadflow.greenRoad.includes(greenSeed2Coordinate) ||
        roadflow.greenRoad.includes(greenSeed3Coordinate) ||
        roadflow.greenRoad.includes(greenSeed4Coordinate)
      ) {
        return true;
      }
    } else {
      return false;
    }
  }

  generateRoadMaps();
  type CurrentPlayer = "playerOne" | "playerTwo";
  type CurrentButton = {
    type: "button0" | "button1" | "button2" | "button3";
    value: number;
  };
  const [gameStarted, setGameStarted] = useState(false);
  const [currentPlayer, setcurrentPlayer] =
    useState<CurrentPlayer>("playerTwo");
  const [refree, SetRefree] = useState("Player 1 Turn");
  const [currentButton, setCurrentButton] = useState<CurrentButton>({
    type: "button0",
    value: 0,
  });

  // function to click both die at the same time;
  function handleDice(): void {
    setGameStarted(true);
    if (gameStarted && button3Value > 0) {
      return;
    }
    handleDie1();
    handleDie2();
  }

  const [seeds, setSeeds] = useState([
    {
      id: "red-seed-1",
      position: "r-one",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-2",
      position: "r-two",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-3",
      position: "r-three",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-4",
      position: "r-four",
      color: "red",
      onroad: false,
    },
    {
      id: "yellow-seed-1",
      position: "y-one",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-2",
      position: "y-two",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-3",
      position: "y-three",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-4",
      position: "y-four",
      color: "yellow",
      onroad: false,
    },
    {
      id: "blue-seed-1",
      position: "b-one",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-2",
      position: "b-two",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-3",
      position: "b-three",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-4",
      position: "b-four",
      color: "blue",
      onroad: false,
    },
    {
      id: "green-seed-1",
      position: "g-one",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-2",
      position: "g-two",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-3",
      position: "g-three",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-4",
      position: "g-four",
      color: "green",
      onroad: false,
    },
  ]);

  function findRepeatedItems(
    arr: string[]
  ): { item: string; count: number; indexes: number[] }[] {
    const repeatedItems: {
      [key: string]: { count: number; indexes: number[] };
    } = {};

    arr.forEach((item, index) => {
      if (repeatedItems[item]) {
        repeatedItems[item].count++;
        repeatedItems[item].indexes.push(index);
      } else {
        repeatedItems[item] = {
          count: 1,
          indexes: [index],
        };
      }
    });
    const result: { item: string; count: number; indexes: number[] }[] = [];
    for (const item in repeatedItems) {
      if (repeatedItems[item].count > 1) {
        result.push({
          item: item,
          count: repeatedItems[item].count,
          indexes: repeatedItems[item].indexes,
        });
      }
    }

    return result;
  }
  const seedCoordinates: string[] = [
    "a",
    "k",
    "c",
    "a",
    "d",
    "e",
    "b",
    "a",
    "c",
  ];
  const repeatedItems = findRepeatedItems(seedCoordinates);

  function countPlayerSeeds() {
    let playerWon = "";
    const allSeedCoordinates = [
      seeds[0].position,
      seeds[1].position,
      seeds[2].position,
      seeds[3].position,
      seeds[4].position,
      seeds[5].position,
      seeds[6].position,
      seeds[7].position,
      seeds[8].position,
      seeds[9].position,
      seeds[10].position,
      seeds[11].position,
      seeds[12].position,
      seeds[13].position,
      seeds[14].position,
      seeds[15].position,
    ];
    const repeatedElement = findRepeatedItems(allSeedCoordinates);

    if (repeatedElement.length === 0) {
      return;
    }

    console.log(repeatedItems);
    for (let i = 0; i <= repeatedElement.length - 1; i++) {
      const players = getPlayerFromRepeatedArray(
        repeatedElement[i].indexes[0],
        repeatedElement[i].indexes[1]
      );
      console.log(players);
      if (players[0] === players[1]) {
        const repeated = document.getElementById(repeatedElement[i].item);
        if (repeated !== null) {
          repeated.textContent = repeatedElement[i].count.toString();
        }
      } else {
        if (currentPlayer === "playerOne") {
          const playerOneIndex = repeatedElement[i].indexes[0];
          const playerTwoIndex = repeatedElement[i].indexes[1];
          const elem = document.getElementById(seeds[playerTwoIndex].id);
          const two = seeds[playerTwoIndex].position;
          alert(two)
          const elemPreviousPosition = document.getElementById(seeds[playerTwoIndex].position);
          elem.style.opacity = '1';
          
          updateSeed(playerOneIndex, false, 'won');
          updateSeed(playerTwoIndex, false, 'home');
          
          // repeatedItem[0].item is constantly playerOne
          // repeatedItem[0].index setState seeds [repeatedItem0]
          // 
          playerWon = "player1";
        } else if (currentPlayer === "playerTwo") {
          playerWon = "player2";
        }
      }
    }
    return playerWon;
  }
  // let demo = [0, 7];
  // console.log(getPlayerFromRepeatedArray(1, 10));
  // considering this array demo,
  // Write a function that returns 'playerOne' if  demo properties is between 0 and 7 else returns 'playerTwo';
  function getPlayerFromRepeatedArray(index1: number, index2: number) {
    let player: string[] = [];
    if (index1 < 8) {
      player.push("playerOne");
    } else {
      player.push("playerTwo");
    }
    if (index2 < 8) {
      player.push("playerOne");
    } else {
      player.push("playerTwo");
    }
    return player;
  }
  function isPlayerOneSeedAvailable() {
    let PlayerOneSeedOnTheRoad = [];
    for (let i = 0; i <= 7; i++) {
      if (seeds[i].onroad) {
        PlayerOneSeedOnTheRoad.push(seeds[i].position);
      }
    }
    return PlayerOneSeedOnTheRoad.length;
  }
  function isPlayerTwoSeedAvailable() {
    let PlayerTwoSeedOnTheRoad = [];
    for (let i = 0; i <= 7; i++) {
      if (seeds[i + 8].onroad) {
        PlayerTwoSeedOnTheRoad.push(seeds[i].position);
      }
    }
    return PlayerTwoSeedOnTheRoad.length;
  }

  const onlyThirdButtonAllowed = () => {
    let CurrentPlayerSeedOnTheRoad = [];
    if (currentPlayer === "playerOne") {
      for (let i = 0; i <= 7; i++) {
        if (seeds[i].onroad) {
          CurrentPlayerSeedOnTheRoad.push(seeds[i].position);
        }
      }
    } else if (currentPlayer === "playerTwo") {
      for (let i = 8; i <= 15; i++) {
        if (seeds[i].onroad) {
          CurrentPlayerSeedOnTheRoad.push(seeds[i].position);
        }
      }
    }
    const validButton = dieValue1.num === 6 || dieValue2.num === 6;
    if (CurrentPlayerSeedOnTheRoad.length === 1 && !validButton) {
      return true;
    } else {
      return false;
    }
  };
  // The useEffect here is to style the activating buttons if onlyThirdButtonAllowed is true
  useEffect(() => {
    const buttonAllowed = onlyThirdButtonAllowed();
    if (buttonAllowed) {
      setActivateButtonsClassName({
        button1: "btn-red inactive",
        button2: "btn-blue inactive",
        button3: "btn-green",
      });
    }
  }, [clicked]);

  // function autoPlay() {
  //   let playerOneSeedsOnTheRoad = [];
  //   let playerTwoSeedsOnTheRoad = [];
  //   for (let i = 0; i <= seeds.length - 9; i++) {
  //     if (seeds[i].onroad) {
  //       playerOneSeedsOnTheRoad.push(seeds[i].position);
  //     }
  //     if (seeds[i + 8].onroad) {
  //       playerTwoSeedsOnTheRoad.push(seeds[i].position);
  //     }
  //   }
  //   let validButtons = button1Value === 6 || button2Value === 6;
  //   if (
  //     playerOneSeedsOnTheRoad.length === 1 &&
  //     currentPlayer === "playerOne" &&
  //     !validButtons
  //   ) {
  //     const event = { target: { id: playerOneSeedsOnTheRoad[0] } };
  //     button3AutoClick.current.addEventListener("click", activateButton3);
  //     button3AutoClick.current.click();
  //     moveSeedRef.current.addEventListener("click", moveSeed2(event));
  //     moveSeedRef.current.click();
  //   } else if (
  //     playerTwoSeedsOnTheRoad.length === 1 &&
  //     currentPlayer === "playerTwo" &&
  //     !validButtons
  //   ) {
  //     const event = { target: { id: playerTwoSeedsOnTheRoad[0] } };
  //     button3AutoClick.current.addEventListener("click", activateButton3);
  //     button3AutoClick.current.click();
  //     moveSeedRef.current.addEventListener("click", moveSeed2(event));
  //     moveSeedRef.current.click();
  //   }
  // }
  // useEffect(() => {
  //   autoPlay()
  // }, [currentButton.value,button1Value,button2Value]);

  function reRenderSeeds() {
    const allSeedCoordinates = [
      seeds[0].position,
      seeds[1].position,
      seeds[2].position,
      seeds[3].position,
      seeds[4].position,
      seeds[5].position,
      seeds[6].position,
      seeds[7].position,
      seeds[8].position,
      seeds[9].position,
      seeds[10].position,
      seeds[11].position,
      seeds[12].position,
      seeds[13].position,
      seeds[14].position,
      seeds[15].position,
    ];
    for (let i = 0; i <= allSeedCoordinates.length - 1; i++) {
      const seeds = document.getElementById(allSeedCoordinates[i]);
      if (seeds !== null) {
        seeds.style.opacity = "1";
        seeds.textContent = "";
      }
    }
    for (let i = 0; i < allSeedCoordinates.length - 1; i++) {
      const seeds = document.getElementById(allSeedCoordinates[i]);
      if (i < 3) {
        if (seeds !== null) seeds.style.background = "red";
      } else if (i > 3 && i < 8) {
        if (seeds !== null) seeds.style.background = "yellow";
      } else if (i > 7 && i < 12) {
        if (seeds !== null) seeds.style.background = "blue";
      } else if (i > 11 && i < 16) {
        if (seeds !== null) seeds.style.background = "green";
      }
    }
  }

  useEffect(() => {
    countPlayerSeeds();
    reRenderSeeds();
    countPlayerSeeds();
  }, [seeds]);

  const updateSeed = (
    index: number,
    onroad: boolean,
    position: string
  ): void => {
    setSeeds((prevSeeds) => {
      const updatedSeeds = [...prevSeeds];
      updatedSeeds[index] = {
        ...updatedSeeds[index],
        position,
        onroad,
      };
      return updatedSeeds;
    });
  };
  // updated HandleSeed

  const handleRedSeed1 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(0, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(0, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(0, true, roadflow.redRoad[0]);
      }
    }
    const redSeed1 = document.getElementById("red-seed-1");
    if (redSeed1 !== null) redSeed1.style.opacity = "0";
    resetButtons();
  };

  const handleRedSeed2 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(1, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(1, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(1, true, roadflow.redRoad[0]);
      }
    }
    const redSeed2 = document.getElementById("red-seed-2");
    if (redSeed2 !== null) redSeed2.style.opacity = "0";
    resetButtons();
  };
  const handleRedSeed3 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(2, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(2, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(2, true, roadflow.redRoad[0]);
      }
    }
    const redSeed3 = document.getElementById("red-seed-3");
    if (redSeed3 !== null) redSeed3.style.opacity = "0";
    resetButtons();
  };
  const handleRedSeed4 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(3, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(3, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(3, true, roadflow.redRoad[0]);
      }
    }
    const redSeed4 = document.getElementById("red-seed-4");
    if (redSeed4 !== null) redSeed4.style.opacity = "0";
    resetButtons();
  };

  const handleYellowSeed1 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(4, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(4, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(4, true, roadflow.yellowRoad[0]);
      }
    }
    const yellowSeed1 = document.getElementById("yellow-seed-1");
    if (yellowSeed1 !== null) yellowSeed1.style.opacity = "0";
    resetButtons();
  };

  const handleYellowSeed2 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(5, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(5, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(5, true, roadflow.yellowRoad[0]);
      }
    }
    const yellowSeed2 = document.getElementById("yellow-seed-2");
    if (yellowSeed2 !== null) yellowSeed2.style.opacity = "0";
    resetButtons();
  };
  const handleYellowSeed3 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(6, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(6, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(6, true, roadflow.yellowRoad[0]);
      }
    }
    const yellowSeed3 = document.getElementById("yellow-seed-3");
    if (yellowSeed3 !== null) yellowSeed3.style.opacity = "0";
    resetButtons();
  };
  const handleYellowSeed4 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerTwo") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerOneSeedsAvail = isPlayerOneSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerOneSeedsAvail > 0) {
      updateSeed(7, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(7, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(7, true, roadflow.yellowRoad[0]);
      }
    }
    const yellowSeed4 = document.getElementById("yellow-seed-4");
    if (yellowSeed4 !== null) yellowSeed4.style.opacity = "0";
    resetButtons();
  };

  const handleBlueSeed1 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    // jhdj
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(8, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(8, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(8, true, roadflow.blueRoad[0]);
      }
    }
    const blueSeed1 = document.getElementById("blue-seed-1");
    if (blueSeed1 !== null) blueSeed1.style.opacity = "0";
    resetButtons();
  };
  const handleBlueSeed2 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(9, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(9, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(9, true, roadflow.blueRoad[0]);
      }
    }
    const blueSeed2 = document.getElementById("blue-seed-2");
    if (blueSeed2 !== null) blueSeed2.style.opacity = "0";
    resetButtons();
  };
  const handleBlueSeed3 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(10, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(10, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(10, true, roadflow.blueRoad[0]);
      }
    }
    const blueSeed3 = document.getElementById("blue-seed-3");
    if (blueSeed3 !== null) blueSeed3.style.opacity = "0";
    resetButtons();
  };
  const handleBlueSeed4 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(11, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(11, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(11, true, roadflow.blueRoad[0]);
      }
    }
    const blueSeed4 = document.getElementById("blue-seed-4");
    if (blueSeed4 !== null) blueSeed4.style.opacity = "0";
    resetButtons();
  };
  const handleGreenSeed1 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(12, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(12, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(12, true, roadflow.greenRoad[0]);
      }
    }
    const greenSeed1 = document.getElementById("green-seed-1");
    if (greenSeed1 !== null) greenSeed1.style.opacity = "0";
    resetButtons();
  };
  const handleGreenSeed2 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(13, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(13, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(13, true, roadflow.greenRoad[0]);
      }
    }
    const greenSeed2 = document.getElementById("green-seed-2");
    if (greenSeed2 !== null) greenSeed2.style.opacity = "0";
    resetButtons();
  };
  const handleGreenSeed3 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(14, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(14, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(14, true, roadflow.greenRoad[0]);
      }
    }

    const greenSeed3 = document.getElementById("green-seed-3");
    if (greenSeed3 !== null) greenSeed3.style.opacity = "0";
    resetButtons();
  };
  const handleGreenSeed4 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    if (currentPlayer === "playerOne") {
      return;
    }
    if (currentButton.type === "button3" || currentButton.type === "button0") {
      return;
    }
    const numberOfplayerTwoSeedsAvail = isPlayerTwoSeedAvailable();
    const acceptedSeeds = button1Value === 6 && button2Value === 6;
    if (numberOfplayerTwoSeedsAvail > 0) {
      updateSeed(15, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updateSeed(15, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updateSeed(15, true, roadflow.greenRoad[0]);
      }
    }

    const greenSeed4 = document.getElementById("green-seed-4");
    if (greenSeed4 !== null) greenSeed4.style.opacity = "0";
    resetButtons();
  };
  useEffect(() => {
    const isValid = isPlayer1Valid();
    const validButton = button1Value === 6 || button2Value === 6;
    if (!isValid && !validButton) {
      setButton1Value(0);
      setButton2Value(0);
      setButton3Value(0);
      if (currentPlayer === "playerOne") {
        setcurrentPlayer("playerTwo");
        SetRefree("Player 2 Turn");
      } else if (currentPlayer === "playerTwo") {
        setcurrentPlayer("playerOne");
        SetRefree("Player 1 Turn");
      }
    }
    const combinedButtons = button1Value + button2Value;
    const playersonTheRoad =
      seeds[0].onroad ||
      seeds[1].onroad ||
      seeds[2].onroad ||
      seeds[3].onroad ||
      seeds[4].onroad ||
      seeds[5].onroad ||
      seeds[6].onroad ||
      seeds[7].onroad ||
      seeds[8].onroad ||
      seeds[9].onroad ||
      seeds[10].onroad ||
      seeds[11].onroad ||
      seeds[12].onroad ||
      seeds[13].onroad ||
      seeds[14].onroad ||
      seeds[15].onroad;
    if (playersonTheRoad && combinedButtons === 0) {
      if (currentPlayer === "playerOne") {
        setcurrentPlayer("playerTwo");
        SetRefree("Player 2 Turn");
      } else if (currentPlayer === "playerTwo") {
        setcurrentPlayer("playerOne");
        SetRefree("Player 1 Turn");
      }
    }
  }, [
    clicked,
    seeds[0].position,
    seeds[1].position,
    seeds[2].position,
    seeds[3].position,
    seeds[4].position,
    seeds[5].position,
    seeds[6].position,
    seeds[7].position,
    seeds[8].position,
    seeds[9].position,
    seeds[10].position,
    seeds[11].position,
    seeds[12].position,
    seeds[13].position,
    seeds[14].position,
    seeds[15].position,
  ]);

  // updated useeffect
  useEffect(() => {
    for (let i = 0; i <= seeds.length - 1; i++) {
      if (seeds[i].onroad) {
        const seed = document.getElementById(seeds[i].position);
        if (seed !== null) {
          seed.style.opacity = "1";
          seed.style.background = seeds[i].color;
        }
      }
    }
  }, [seeds]);

  function resetButtons() {
    if (currentButton.type === "button1") {
      setButton1Value(0);
    } else if (currentButton.type === "button2") {
      setButton2Value(0);
    } else if (currentButton.type === "button3") {
      setButton1Value(0);
      setButton2Value(0);
      setButton3Value(0);
    }
    setCurrentButton({ type: "button0", value: 0 });
    // if (redSeed1.position !== "r0" && button3Value === 0) {
    //   alert("changed");
    // }
  }
  const activateButton1 = () => {
    const buttonAllowed = onlyThirdButtonAllowed();
    if (gameStarted === false) {
      return;
    }
    if (buttonAllowed) {
      return;
    }
    setCurrentButton({
      type: "button1",
      value: button1Value,
    });
  };
  const activateButton2 = () => {
    const buttonAllowed = onlyThirdButtonAllowed();
    if (gameStarted === false && buttonAllowed) {
      return;
    }
    if (buttonAllowed) {
      return;
    }
    setCurrentButton({
      type: "button2",
      value: button2Value,
    });
  };
  const activateButton3 = () => {
    if (gameStarted === false) {
      return;
    }
    setCurrentButton({
      type: "button3",
      value: button3Value,
    });
  };
  const [activateButtonsClassName, setActivateButtonsClassName] = useState({
    button1: "btn-red",
    button2: "btn-blue",
    button3: "btn-green",
  });
  useEffect(() => {
    if (currentButton.type === "button1") {
      setActivateButtonsClassName({
        button1: "btn-red active",
        button2: "btn-blue",
        button3: "btn-green",
      });
    } else if (currentButton.type === "button2") {
      setActivateButtonsClassName({
        button1: "btn-red",
        button2: "btn-blue active",
        button3: "btn-green",
      });
    } else if (currentButton.type === "button3") {
      setActivateButtonsClassName({
        button1: "btn-red",
        button2: "btn-blue",
        button3: "btn-green active",
      });
    } else {
      setActivateButtonsClassName({
        button1: "btn-red",
        button2: "btn-blue",
        button3: "btn-green",
      });
    }
  }, [currentButton.type]);
  function moveSeed2(e: any) {
    if (currentButton.value === 0) {
      return;
    }
    // get coordinates of all seeds
    const allSeedCoordinates = [
      seeds[0].position,
      seeds[1].position,
      seeds[2].position,
      seeds[3].position,
      seeds[4].position,
      seeds[5].position,
      seeds[6].position,
      seeds[7].position,
      seeds[8].position,
      seeds[9].position,
      seeds[10].position,
      seeds[11].position,
      seeds[12].position,
      seeds[13].position,
      seeds[14].position,
      seeds[15].position,
    ];
    const id = e.target.id;
    const currentSeedIndex = allSeedCoordinates.indexOf(id);
    let playerSeed = "";
    for (let i = 0; i <= allSeedCoordinates.length - 1; i++) {
      if (currentSeedIndex < 4) {
        playerSeed = "red";
      } else if (currentSeedIndex > 3 && currentSeedIndex < 8) {
        playerSeed = "yellow";
      } else if (currentSeedIndex > 7 && currentSeedIndex < 12) {
        playerSeed = "blue";
      } else if (currentSeedIndex > 11 && currentSeedIndex < 16) {
        playerSeed = "green";
      }
    }
    // const playerOne = playerSeed === "red" || playerSeed === "yellow";
    // const playerTwo = playerSeed === "blue" || playerSeed === "green";
    if (playerSeed === "red" && currentPlayer === "playerTwo") {
      return;
    } else if (playerSeed === "blue" && currentPlayer === "playerOne") {
      return;
    } else if (playerSeed === "yellow" && currentPlayer === "playerTwo") {
      return;
    } else if (playerSeed === "green" && currentPlayer === "playerOne") {
      return;
    }
    const redseed1pos = roadflow.redRoad.indexOf(seeds[0].position);
    const redseed2pos = roadflow.redRoad.indexOf(seeds[1].position);
    const redseed3pos = roadflow.redRoad.indexOf(seeds[2].position);
    const redseed4pos = roadflow.redRoad.indexOf(seeds[3].position);

    const yellowSeed1pos = roadflow.yellowRoad.indexOf(seeds[4].position);
    const yellowSeed2pos = roadflow.yellowRoad.indexOf(seeds[5].position);
    const yellowSeed3pos = roadflow.yellowRoad.indexOf(seeds[6].position);
    const yellowSeed4pos = roadflow.yellowRoad.indexOf(seeds[7].position);

    const blueseed1pos = roadflow.blueRoad.indexOf(seeds[8].position);
    const blueseed2pos = roadflow.blueRoad.indexOf(seeds[9].position);
    const blueseed3pos = roadflow.blueRoad.indexOf(seeds[10].position);
    const blueseed4pos = roadflow.blueRoad.indexOf(seeds[11].position);

    const greenSeed1pos = roadflow.greenRoad.indexOf(seeds[12].position);
    const greenSeed2pos = roadflow.greenRoad.indexOf(seeds[13].position);
    const greenSeed3pos = roadflow.greenRoad.indexOf(seeds[14].position);
    const greenSeed4pos = roadflow.greenRoad.indexOf(seeds[15].position);

    if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed1pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(seeds[0].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        0,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed2pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(seeds[1].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        1,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed3pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(seeds[2].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        2,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed4pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(seeds[3].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        3,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed1pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(seeds[4].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        4,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed2pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(seeds[5].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        5,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed3pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(seeds[6].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        6,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed4pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(seeds[7].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        7,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed1pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(seeds[8].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        8,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed2pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(seeds[9].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        9,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed3pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(seeds[10].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        10,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed4pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(seeds[11].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        11,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed1pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(seeds[12].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        12,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed2pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(seeds[13].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        13,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed3pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(seeds[14].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        14,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed4pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(seeds[15].position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updateSeed(
        15,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else {
      return;
    }
    resetButtons();
  }
  return (
    <section className="container">
      <h1>{refree}</h1>
      <section className="gameboard">
        <div className="column1 column">
          <div className="green-box">
            <div onClick={handleGreenSeed1} id="green-seed-1"></div>
            <div onClick={handleGreenSeed2} id="green-seed-2"></div>
            <div onClick={handleGreenSeed3} id="green-seed-3"></div>
            <div onClick={handleGreenSeed4} id="green-seed-4"></div>
          </div>
          <div className="road vertical-road yellow-road">
            {yellowRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveSeed2} ref={moveSeedRef}></div>
                </div>
              );
            })}
          </div>
          <div className="yellow-box">
            <div onClick={handleYellowSeed1} id="yellow-seed-1"></div>
            <div onClick={handleYellowSeed2} id="yellow-seed-2"></div>
            <div onClick={handleYellowSeed3} id="yellow-seed-3"></div>
            <div onClick={handleYellowSeed4} id="yellow-seed-4"></div>
          </div>
        </div>
        <div className="column2 column">
          <div className="road-btw-box horizontal-road green-road">
            {greenRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveSeed2} ref={moveSeedRef}></div>
                </div>
              );
            })}
          </div>
          <div className="road dice-container">
            <Dice
              dieValue={dieValue1.num}
              className={dieValue1.className}
              handleDie={handleDice}
            />
            <Dice
              dieValue={dieValue2.num}
              className={dieValue2.className}
              handleDie={handleDice}
            />
          </div>
          <div className="road-btw-box horizontal-road blue-road">
            {blueRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveSeed2} ref={moveSeedRef}></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="column3 column">
          <div className="red-box">
            <div onClick={handleRedSeed1} id="red-seed-1"></div>
            <div onClick={handleRedSeed2} id="red-seed-2"></div>
            <div onClick={handleRedSeed3} id="red-seed-3"></div>
            <div onClick={handleRedSeed4} id="red-seed-4"></div>
          </div>
          <div className="road vertical-road red-road">
            {redRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveSeed2} ref={moveSeedRef} />
                </div>
              );
            })}
          </div>
          <div className="blue-box">
            <div onClick={handleBlueSeed1} id="blue-seed-1"></div>
            <div onClick={handleBlueSeed2} id="blue-seed-2"></div>
            <div onClick={handleBlueSeed3} id="blue-seed-3"></div>
            <div onClick={handleBlueSeed4} id="blue-seed-4"></div>
          </div>
        </div>
      </section>
      <div className="button-container">
        <span
          className={activateButtonsClassName.button1}
          onClick={activateButton1}
        >
          <div className="ludo-content1">{button1Value}</div>
        </span>
        <span
          className={activateButtonsClassName.button2}
          onClick={activateButton2}
        >
          <div className="ludo-content2">{button2Value}</div>
        </span>
        <span
          className={activateButtonsClassName.button3}
          onClick={activateButton3}
          ref={button3AutoClick}
        >
          <div className="ludo-content3">{button1Value + button2Value}</div>
        </span>
      </div>
    </section>
  );
}

export default Gameboard;
