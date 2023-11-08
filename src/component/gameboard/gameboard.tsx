import { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./gameboard.css";
import Dice from "../dice/dice";
import roadflow from "./roadflow";
// set CurrentPlayer to next player if there is only 1 seed left that cant move;
function Gameboard() {
  function filterArray(arr1: string[], arr2: string[]) {
    const filteredArray = arr1.filter((item) => !arr2.includes(item));
    return filteredArray;
  }

  const [clicked, setClicked] = useState("");
  const button3AutoClick = useRef(null);
  const moveSeedRef = useRef(null);
  const getRandomNumber = (): number => {
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    return randomNumber;
  };
  const [winningSeed, setwinningSeed] = useState(false);

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

  const [currentPlayerHadDoubleSix, setcurrentPlayerHadDoubleSix] =
    useState(false);
  useEffect(() => {
    if (dieValue1.num === 6 && dieValue2.num === 6) {
      setcurrentPlayerHadDoubleSix(true);
    }
  }, [button1Value, button2Value]);
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
    setcurrentPlayerHadDoubleSix(false);
  }
  const [player1Seeds, setplayer1Seeds] = useState([
    {
      id: "red-seed-1",
      position: "home",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-2",
      position: "home",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-3",
      position: "home",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-4",
      position: "home",
      color: "red",
      onroad: false,
    },
    {
      id: "yellow-seed-1",
      position: "home",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-2",
      position: "home",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-3",
      position: "home",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-4",
      position: "home",
      color: "yellow",
      onroad: false,
    },
  ]);
  console.log(player1Seeds);
  const [player2Seeds, setplayer2Seeds] = useState([
    {
      id: "blue-seed-1",
      position: "home",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-2",
      position: "home",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-3",
      position: "home",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-4",
      position: "home",
      color: "blue",
      onroad: false,
    },
    {
      id: "green-seed-1",
      position: "home",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-2",
      position: "home",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-3",
      position: "home",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-4",
      position: "home",
      color: "green",
      onroad: false,
    },
  ]);
  console.log(player2Seeds);
  function isPlayer2Valid() {
    let player2SeedPositions = [];
    for (let i = 0; i <= player2Seeds.length - 1; i++) {
      player2SeedPositions.push(player2Seeds[i].position);
    }
    const hasHomeOrWon2 = hasNonHomeWonItems(player2SeedPositions);
    if (hasHomeOrWon2) {
      return true;
    } else {
      return false;
    }

    // hj,hjb
    const blueSeed1Coordinate = player2Seeds[0].position;
    const blueSeed2Coordinate = player2Seeds[1].position;
    const blueSeed3Coordinate = player2Seeds[2].position;
    const blueSeed4Coordinate = player2Seeds[3].position;

    const greenSeed1Coordinate = player2Seeds[4].position;
    const greenSeed2Coordinate = player2Seeds[5].position;
    const greenSeed3Coordinate = player2Seeds[6].position;
    const greenSeed4Coordinate = player2Seeds[7].position;
    if (currentPlayer === "playerTwo") {
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
      } else {
        return false;
      }
    }
  }
  function isPlayer1Valid() {
    let player1SeedPositions = [];
    for (let i = 0; i <= player1Seeds.length - 1; i++) {
      player1SeedPositions.push(player1Seeds[i].position);
    }
    const hasHomeOrWon1 = hasNonHomeWonItems(player1SeedPositions);
    if (hasHomeOrWon1) {
      return true;
    } else {
      return false;
    }
    // dkj
    const redSeed1Coordinate = player1Seeds[0].position;
    const redSeed2Coordinate = player1Seeds[1].position;
    const redSeed3Coordinate = player1Seeds[2].position;
    const redSeed4Coordinate = player1Seeds[3].position;

    const yellowSeed1Coordinate = player1Seeds[4].position;
    const yellowSeed2Coordinate = player1Seeds[5].position;
    const yellowSeed3Coordinate = player1Seeds[6].position;
    const yellowSeed4Coordinate = player1Seeds[7].position;

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
      } else {
        return false;
      }
    }
  }

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
  function countPlayerSeeds() {
    // for (let i = 0; i <= player1Seeds.length - 1; i++) {
    //   const invalidPlayerSeed1 =
    //     player1Seeds[i].position === "won" ||
    //     player1Seeds[i].position === "home";
    //   for (let j = 0; j <= player2Seeds.length - 1; j++) {
    //     const invalidPlayerSeed2 =
    //       player2Seeds[j].position === "won" ||
    //       player2Seeds[j].position === "home";
    //     if (currentPlayer === "playerOne" && !invalidPlayerSeed1) {
    //        setwinningSeed(true);
    //       if (player1Seeds[i].position === player2Seeds[j].position) {
    //         updatePlayer1Seed(i, false, "won");
    //         updatePlayer2Seed(j, false, "home");
    //       }
    //     } else if (currentPlayer === "playerTwo" && !invalidPlayerSeed2) {

    //       if (player1Seeds[i].position === player2Seeds[j].position) {
    //         updatePlayer1Seed(i, false, "home");
    //         updatePlayer2Seed(j, false, "won");
    //       }
    //     }
    //   }
    // }

    const allSeedCoordinates = [
      player1Seeds[0].position,
      player1Seeds[1].position,
      player1Seeds[2].position,
      player1Seeds[3].position,
      player1Seeds[4].position,
      player1Seeds[5].position,
      player1Seeds[6].position,
      player1Seeds[7].position,
      player2Seeds[0].position,
      player2Seeds[1].position,
      player2Seeds[2].position,
      player2Seeds[3].position,
      player2Seeds[4].position,
      player2Seeds[5].position,
      player2Seeds[6].position,
      player2Seeds[7].position,
    ];

    const arr = findRepeatedItems(allSeedCoordinates);
    const repeatedElement = arr.filter(
      (item) => item.item !== "home" && item.item !== "won"
    );

    if (repeatedElement.length === 0) {
      return;
    }

    for (let i = 0; i <= repeatedElement.length - 1; i++) {
      const players = getPlayerFromRepeatedArray(
        repeatedElement[i].indexes[0],
        repeatedElement[i].indexes[repeatedElement[i].indexes.length - 1]
      );
      if (players[0] === players[1]) {
        return;
      } else {
        if (currentPlayer === "playerOne") {
          setwinningSeed(true);
          const playerOneIndex = repeatedElement[i].indexes[0];
          const playerTwoIndex =
            repeatedElement[i].indexes[repeatedElement[i].indexes.length - 1] -
            8;
          const player2 = player2Seeds[playerTwoIndex].position;
          clearPlayerSeeds(player2);
          updatePlayer1Seed(playerOneIndex, false, "won");
          updatePlayer2Seed(playerTwoIndex, false, "home");
          setTimeout(() => {
            if (button1Value === 0 && button2Value === 0) {
              setcurrentPlayer("playerTwo");
              SetRefree("player 2 turn");
            }
          }, 30);
        } else if (currentPlayer === "playerTwo") {
          setwinningSeed(true);
          const playerOneIndex = repeatedElement[i].indexes[0];
          const playerTwoIndex =
            repeatedElement[i].indexes[repeatedElement[i].indexes.length - 1] -
            8;
          const player1 = player1Seeds[playerTwoIndex].position;
          clearPlayerSeeds(player1);
          updatePlayer1Seed(playerOneIndex, false, "home");
          updatePlayer2Seed(playerTwoIndex, false, "won");
          setTimeout(() => {
            if (button1Value === 0 && button2Value === 0) {
              setcurrentPlayer("playerOne");
              SetRefree("player 1 turn");
            }
          }, 30);
        }
      }
    }
  }

  function clearPlayerSeeds(id: string) {
    const elem = document.getElementById(id);
    for (let i = 0; i <= 20; i++) {
      if (elem !== null) elem.style.opacity = "0";
    }
    setTimeout(() => {
      if (elem !== null) elem.style.opacity = "0";
    }, 50);
  }
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
      if (player1Seeds[i].onroad) {
        PlayerOneSeedOnTheRoad.push(player1Seeds[i].position);
      }
    }
    return PlayerOneSeedOnTheRoad.length;
  }
  function isPlayerTwoSeedAvailable() {
    let PlayerTwoSeedOnTheRoad = [];
    for (let i = 0; i <= 7; i++) {
      if (player2Seeds[i].onroad) {
        PlayerTwoSeedOnTheRoad.push(player2Seeds[i].position);
      }
    }
    return PlayerTwoSeedOnTheRoad.length;
  }

  const onlyThirdButtonAllowed = () => {
    let CurrentPlayerSeedOnTheRoad = [];
    if (currentPlayer === "playerOne") {
      for (let i = 0; i <= 7; i++) {
        if (player1Seeds[i].onroad) {
          CurrentPlayerSeedOnTheRoad.push(player1Seeds[i].position);
        }
      }
    } else if (currentPlayer === "playerTwo") {
      for (let i = 0; i <= 7; i++) {
        if (player2Seeds[i].onroad) {
          CurrentPlayerSeedOnTheRoad.push(player2Seeds[i].position);
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

  useEffect(() => {
    countPlayerSeeds();
  }, [player1Seeds, player2Seeds]);
  function updatePlayer1Seed(
    index: number,
    onroad: boolean,
    position: string
  ): void {
    setplayer1Seeds((prevSeeds) => {
      const updatedSeeds = [...prevSeeds];
      updatedSeeds[index] = {
        ...updatedSeeds[index],
        position,
        onroad,
      };
      return updatedSeeds;
    });
  }
  function updatePlayer2Seed(
    index: number,
    onroad: boolean,
    position: string
  ): void {
    setplayer2Seeds((prevSeeds) => {
      const updatedSeeds = [...prevSeeds];
      updatedSeeds[index] = {
        ...updatedSeeds[index],
        position,
        onroad,
      };
      return updatedSeeds;
    });
  }

  const handleRedSeed1 = () => {
    const seed = document.getElementById(player1Seeds[0].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(0, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(0, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(0, true, roadflow.redRoad[0]);
      }
    }
    resetButtons();
  };

  const handleRedSeed2 = () => {
    const seed = document.getElementById(player1Seeds[1].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(1, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(1, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(1, true, roadflow.redRoad[0]);
      }
    }
    resetButtons();
  };
  const handleRedSeed3 = () => {
    const seed = document.getElementById(player1Seeds[2].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(2, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(2, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(2, true, roadflow.redRoad[0]);
      }
    }
    resetButtons();
  };
  const handleRedSeed4 = () => {
    const seed = document.getElementById(player1Seeds[3].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(3, true, roadflow.redRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(3, true, roadflow.redRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(3, true, roadflow.redRoad[0]);
      }
    }
    resetButtons();
  };

  const handleYellowSeed1 = () => {
    const seed = document.getElementById(player1Seeds[4].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(4, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(4, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(4, true, roadflow.yellowRoad[0]);
      }
    }
    resetButtons();
  };

  const handleYellowSeed2 = () => {
    const seed = document.getElementById(player1Seeds[5].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(5, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(5, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(5, true, roadflow.yellowRoad[0]);
      }
    }
    resetButtons();
  };
  const handleYellowSeed3 = () => {
    const seed = document.getElementById(player1Seeds[6].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(6, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(6, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(6, true, roadflow.yellowRoad[0]);
      }
    }
    resetButtons();
  };
  const handleYellowSeed4 = () => {
    const seed = document.getElementById(player1Seeds[7].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer1Seed(7, true, roadflow.yellowRoad[0]);
    } else if (numberOfplayerOneSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer1Seed(7, true, roadflow.yellowRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer1Seed(7, true, roadflow.yellowRoad[0]);
      }
    }
    resetButtons();
  };

  const handleBlueSeed1 = () => {
    const seed = document.getElementById(player2Seeds[0].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(0, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(0, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(0, true, roadflow.blueRoad[0]);
      }
    }
    resetButtons();
  };
  const handleBlueSeed2 = () => {
    const seed = document.getElementById(player2Seeds[1].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(1, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(1, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(1, true, roadflow.blueRoad[0]);
      }
    }
    resetButtons();
  };
  const handleBlueSeed3 = () => {
    const seed = document.getElementById(player2Seeds[2].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(2, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(2, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(2, true, roadflow.blueRoad[0]);
      }
    }
    resetButtons();
  };
  const handleBlueSeed4 = () => {
    const seed = document.getElementById(player2Seeds[3].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(3, true, roadflow.blueRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(3, true, roadflow.blueRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(3, true, roadflow.blueRoad[0]);
      }
    }
    resetButtons();
  };
  const handleGreenSeed1 = () => {
    const seed = document.getElementById(player2Seeds[4].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(4, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(4, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(4, true, roadflow.greenRoad[0]);
      }
    }

    resetButtons();
  };
  const handleGreenSeed2 = () => {
    const seed = document.getElementById(player2Seeds[5].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(5, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(5, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(5, true, roadflow.greenRoad[0]);
      }
    }

    resetButtons();
  };
  const handleGreenSeed3 = () => {
    const seed = document.getElementById(player2Seeds[6].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(6, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(6, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(6, true, roadflow.greenRoad[0]);
      }
    }

    resetButtons();
  };
  const handleGreenSeed4 = () => {
    const seed = document.getElementById(player2Seeds[7].id);
    if (seed !== null && seed.style.opacity === "0") {
      return;
    }
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
      updatePlayer2Seed(7, true, roadflow.greenRoad[0]);
    } else if (numberOfplayerTwoSeedsAvail === 0) {
      if (!acceptedSeeds) {
        updatePlayer2Seed(7, true, roadflow.greenRoad[button3Value - 6]);
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
      } else {
        updatePlayer2Seed(7, true, roadflow.greenRoad[0]);
      }
    }

    resetButtons();
  };
  useEffect(() => {
    // xdjbjv
    let NumberOfPlayer1SeedsOnTheRoad = 0;
    let NumberOfPlayer2SeedsOnTheRoad = 0;
    for (let i = 0; i <= player1Seeds.length - 1; i++) {
      if (player1Seeds[i].onroad) {
        NumberOfPlayer1SeedsOnTheRoad++;
      }
      if (player2Seeds[i].onroad) {
        NumberOfPlayer2SeedsOnTheRoad++;
      }
    }
    // if (currentPlayer === "playerOne" && NumberOfPlayer1SeedsOnTheRoad < 2) {

    // }
  }, [clicked, player1Seeds, player2Seeds]);

  useEffect(() => {
    // if (winningSeed === true) {
    //   setTimeout(() => {
    //     setwinningSeed(false);
    //   }, 300);
    //   return;
    // }
    if (currentPlayerHadDoubleSix === true) {
      return;
    }
    const Player1Valid = isPlayer1Valid();
    const player2Valid = isPlayer2Valid();
    const validButton = button1Value === 6 || button2Value === 6;
    if (currentPlayer === "playerOne") {
      if (!Player1Valid && !validButton) {
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
        setcurrentPlayer("playerTwo");
        SetRefree("Player 2 Turn");
      }
    } else {
      if (!player2Valid && !validButton) {
        setButton1Value(0);
        setButton2Value(0);
        setButton3Value(0);
        setcurrentPlayer("playerOne");
        SetRefree("Player 1 Turn");
      }
    }
    const combinedButtons = button1Value + button2Value;
    // const player1SeedOnTheRoad =
    //   player1Seeds[0].onroad ||
    //   player1Seeds[1].onroad ||
    //   player1Seeds[2].onroad ||
    //   player1Seeds[3].onroad ||
    //   player1Seeds[4].onroad ||
    //   player1Seeds[5].onroad ||
    //   player1Seeds[6].onroad ||
    //   player1Seeds[7].onroad;
    // const player2SeedOnTheRoad =
    //   player2Seeds[0].onroad ||
    //   player2Seeds[1].onroad ||
    //   player2Seeds[2].onroad ||
    //   player2Seeds[3].onroad ||
    //   player2Seeds[4].onroad ||
    //   player2Seeds[5].onroad ||
    //   player2Seeds[6].onroad ||
    //   player2Seeds[7].onroad;
    // const playersonTheRoad =
    //   player1Seeds[0].onroad ||
    //   player1Seeds[1].onroad ||
    //   player1Seeds[2].onroad ||
    //   player1Seeds[3].onroad ||
    //   player1Seeds[4].onroad ||
    //   player1Seeds[5].onroad ||
    //   player1Seeds[6].onroad ||
    //   player1Seeds[7].onroad ||
    //   player2Seeds[0].onroad ||
    //   player2Seeds[1].onroad ||
    //   player2Seeds[2].onroad ||
    //   player2Seeds[3].onroad ||
    //   player2Seeds[4].onroad ||
    //   player2Seeds[5].onroad ||
    //   player2Seeds[6].onroad ||
    //   player2Seeds[7].onroad;
    if (
      currentPlayer === "playerOne" &&
      combinedButtons === 0
      // player1SeedOnTheRoad
    ) {
      setcurrentPlayer("playerTwo");
      SetRefree("Player 2 Turn");
    } else if (
      currentPlayer === "playerTwo" &&
      combinedButtons === 0
      // player2SeedOnTheRoad
    ) {
      setcurrentPlayer("playerOne");
      SetRefree("Player 1 Turn");
    }
    // if (playersonTheRoad && combinedButtons === 0) {
    //   if (currentPlayer === "playerOne") {
    //     setcurrentPlayer("playerTwo");
    //     SetRefree("Player 2 Turn");
    //   } else if (currentPlayer === "playerTwo") {
    //     setcurrentPlayer("playerOne");
    //     SetRefree("Player 1 Turn");
    //   }
    // }
  }, [clicked, player1Seeds, player2Seeds]);

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
  // if the
  function canSeedEnter(currentSeed: string, roadType: string[]) {
    let canSeedEnter = false;
    const SeedArray = roadType;
    const roadLength = SeedArray.length - 1;
    const currentNumber = currentButton.value;
    const currentSeedIndex = roadType.indexOf(currentSeed);
    const potentialFutureValue = currentSeedIndex + currentNumber;
    if (potentialFutureValue > roadLength) {
      canSeedEnter = false;
    } else {
      canSeedEnter = true;
    }
    return canSeedEnter;
  }
  function moveSeed2(e: any) {
    if (currentButton.value === 0) {
      return;
    }
    const allSeedCoordinates = [
      player1Seeds[0].position,
      player1Seeds[1].position,
      player1Seeds[2].position,
      player1Seeds[3].position,
      player1Seeds[4].position,
      player1Seeds[5].position,
      player1Seeds[6].position,
      player1Seeds[7].position,
      player2Seeds[0].position,
      player2Seeds[1].position,
      player2Seeds[2].position,
      player2Seeds[3].position,
      player2Seeds[4].position,
      player2Seeds[5].position,
      player2Seeds[6].position,
      player2Seeds[7].position,
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

    if (playerSeed === "red" && currentPlayer === "playerTwo") {
      return;
    } else if (playerSeed === "blue" && currentPlayer === "playerOne") {
      return;
    } else if (playerSeed === "yellow" && currentPlayer === "playerTwo") {
      return;
    } else if (playerSeed === "green" && currentPlayer === "playerOne") {
      return;
    }
    const redseed1pos = roadflow.redRoad.indexOf(player1Seeds[0].position);
    const redseed2pos = roadflow.redRoad.indexOf(player1Seeds[1].position);
    const redseed3pos = roadflow.redRoad.indexOf(player1Seeds[2].position);
    const redseed4pos = roadflow.redRoad.indexOf(player1Seeds[3].position);

    const yellowSeed1pos = roadflow.yellowRoad.indexOf(
      player1Seeds[4].position
    );
    const yellowSeed2pos = roadflow.yellowRoad.indexOf(
      player1Seeds[5].position
    );
    const yellowSeed3pos = roadflow.yellowRoad.indexOf(
      player1Seeds[6].position
    );
    const yellowSeed4pos = roadflow.yellowRoad.indexOf(
      player1Seeds[7].position
    );

    const blueseed1pos = roadflow.blueRoad.indexOf(player2Seeds[0].position);
    const blueseed2pos = roadflow.blueRoad.indexOf(player2Seeds[1].position);
    const blueseed3pos = roadflow.blueRoad.indexOf(player2Seeds[2].position);
    const blueseed4pos = roadflow.blueRoad.indexOf(player2Seeds[3].position);

    const greenSeed1pos = roadflow.greenRoad.indexOf(player2Seeds[4].position);
    const greenSeed2pos = roadflow.greenRoad.indexOf(player2Seeds[5].position);
    const greenSeed3pos = roadflow.greenRoad.indexOf(player2Seeds[6].position);
    const greenSeed4pos = roadflow.greenRoad.indexOf(player2Seeds[7].position);

    if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed1pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[0].position,
        roadflow.redRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.redRoad.indexOf(
        player1Seeds[0].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        0,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed2pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[1].position,
        roadflow.redRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.redRoad.indexOf(
        player1Seeds[1].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        1,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed3pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[2].position,
        roadflow.redRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.redRoad.indexOf(
        player1Seeds[2].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        2,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed4pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[3].position,
        roadflow.redRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.redRoad.indexOf(
        player1Seeds[3].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        3,
        true,
        roadflow.redRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed1pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[4].position,
        roadflow.yellowRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.yellowRoad.indexOf(
        player1Seeds[4].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        4,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed2pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[5].position,
        roadflow.yellowRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.yellowRoad.indexOf(
        player1Seeds[5].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        5,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed3pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[6].position,
        roadflow.yellowRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.yellowRoad.indexOf(
        player1Seeds[6].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        6,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed4pos]
    ) {
      const validMovement = canSeedEnter(
        player1Seeds[7].position,
        roadflow.yellowRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.yellowRoad.indexOf(
        player1Seeds[7].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer1Seed(
        7,
        true,
        roadflow.yellowRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed1pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[0].position,
        roadflow.blueRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.blueRoad.indexOf(
        player2Seeds[0].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        0,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed2pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[1].position,
        roadflow.blueRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.blueRoad.indexOf(
        player2Seeds[1].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        1,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed3pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[2].position,
        roadflow.blueRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.blueRoad.indexOf(
        player2Seeds[2].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        2,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed4pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[3].position,
        roadflow.blueRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.blueRoad.indexOf(
        player2Seeds[3].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        3,
        true,
        roadflow.blueRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed1pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[4].position,
        roadflow.greenRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.greenRoad.indexOf(
        player2Seeds[4].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        4,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed2pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[5].position,
        roadflow.greenRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.greenRoad.indexOf(
        player2Seeds[5].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        5,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed3pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[6].position,
        roadflow.greenRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.greenRoad.indexOf(
        player2Seeds[6].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        6,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed4pos]
    ) {
      const validMovement = canSeedEnter(
        player2Seeds[7].position,
        roadflow.greenRoad
      );
      if (!validMovement) {
        return;
      }
      const previousPosition = roadflow.greenRoad.indexOf(
        player2Seeds[7].position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      updatePlayer2Seed(
        7,
        true,
        roadflow.greenRoad[previousPosition + currentButton.value]
      );
    } else {
      return;
    }
    resetButtons();
  }
  useLayoutEffect(() => {
    setTimeout(() => {
      // player1 home
      for (let i = 0; i <= player1Seeds.length - 1; i++) {
        if (player1Seeds[i].position === "home") {
          let player1Seed = document.getElementById(player1Seeds[i].id);
          if (player1Seed !== null) {
            player1Seed.style.opacity = "1";
          }
        } else if (player1Seeds[i].position === "won") {
          let player1Seed = document.getElementById(player1Seeds[i].id);
          if (player1Seed !== null) {
            player1Seed.style.opacity = "0";
          }
        } else {
          let player1Seed = document.getElementById(player1Seeds[i].id);
          if (player1Seed !== null) {
            player1Seed.style.opacity = "0";
          }
        }
      }
      // player2 home
      for (let i = 0; i <= player2Seeds.length - 1; i++) {
        if (player2Seeds[i].position === "home") {
          let player2Seed = document.getElementById(player2Seeds[i].id);
          if (player2Seed !== null) {
            player2Seed.style.opacity = "1";
          }
        } else if (player2Seeds[i].position === "won") {
          let player2Seed = document.getElementById(player2Seeds[i].id);
          if (player2Seed !== null) {
            player2Seed.style.opacity = "0";
          }
        } else {
          let player2Seed = document.getElementById(player2Seeds[i].id);
          if (player2Seed !== null) {
            player2Seed.style.opacity = "0";
          }
        }
      }

      // player1 On the road
      for (let i = 0; i <= player1Seeds.length - 1; i++) {
        if (
          player1Seeds[i].position !== "home" ||
          player1Seeds[i].position !== "won"
        ) {
          let player1SeedOnTheRoad = document.getElementById(
            player1Seeds[i].position
          );
          if (player1SeedOnTheRoad !== null) {
            player1SeedOnTheRoad.style.opacity = "1";
            player1SeedOnTheRoad.style.backgroundColor = player1Seeds[i].color;
          }
        } else {
          let player1SeedOnTheRoad = document.getElementById(
            player1Seeds[i].position
          );
          if (player1SeedOnTheRoad !== null) {
            player1SeedOnTheRoad.style.opacity = "0";
            player1SeedOnTheRoad.style.backgroundColor = "none";
          }
        }
      }

      // player2 On The road
      for (let i = 0; i <= player2Seeds.length - 1; i++) {
        if (
          player2Seeds[i].position !== "home" ||
          player2Seeds[i].position !== "won"
        ) {
          const player2SeedOnTheRoad = document.getElementById(
            player2Seeds[i].position
          );
          if (player2SeedOnTheRoad !== null) {
            player2SeedOnTheRoad.style.opacity = "1";
            player2SeedOnTheRoad.style.backgroundColor = player2Seeds[i].color;
          }
        } else {
          const player2SeedOnTheRoad = document.getElementById(
            player2Seeds[i].position
          );
          if (player2SeedOnTheRoad !== null) {
            player2SeedOnTheRoad.style.opacity = "0";
            player2SeedOnTheRoad.style.backgroundColor = "none";
          }
        }
      }
      // This counts the playerSeeds1;
      for (let i = 0; i <= player1Seeds.length - 1; i++) {
        let num = 0;
        for (let j = 0; j <= player1Seeds.length - 1; j++) {
          if (player1Seeds[i].position === player1Seeds[j].position) {
            let elem = document.getElementById(player1Seeds[i].position);
            num++;
            if (elem !== null) elem.textContent = num.toString();
          }
        }
      }
      // This counts playerSeeds2;
      for (let i = 0; i <= player2Seeds.length - 1; i++) {
        let num = 0;
        for (let j = 0; j <= player2Seeds.length - 1; j++) {
          if (player2Seeds[i].position === player2Seeds[j].position) {
            let elem = document.getElementById(player2Seeds[i].position);
            num++;
            if (elem !== null) elem.textContent = num.toString();
          }
        }
      }
    }, 0);
  }, [player1Seeds, player2Seeds]);
  const clearGameBoard = () => {
    const allRoad = roadflow.redRoad;
    let filledRoads = [];
    for (let i = 0; i < player1Seeds.length; i++) {
      filledRoads.push(player1Seeds[i].position);
      filledRoads.push(player2Seeds[i].position);
    }
    const newArr = filterArray(allRoad, filledRoads);
    for (let i = 0; i <= newArr.length - 1; i++) {
      let seed = document.getElementById(newArr[i]);
      if (seed !== null) seed.style.opacity = "0";
    }
    console.log(player2Seeds);
  };
  useEffect(() => {
    const id = setInterval(clearGameBoard, 100);
    return () => {
      clearInterval(id);
    };
  });
  function hasNonHomeWonItems(arr: string[]) {
    for (let item of arr) {
      if (item !== "home" && item !== "won") {
        return true;
      }
    }
    return false;
  }
  // useEffect(() => {
  //   let player1SeedPositions = [];
  //   let player2SeedPositions = [];
  //   for (let i = 0; i <= player1Seeds.length - 1; i++) {
  //     player1SeedPositions.push(player1Seeds[i].position);
  //     player2SeedPositions.push(player2Seeds[i].position);
  //   }
  //   const hasHomeOrWon1 = hasNonHomeWonItems(player1SeedPositions);
  //   const hasHomeOrWon2 = hasNonHomeWonItems(player2SeedPositions);
  //   let validButtons = button1Value > 0 && button2Value > 0;
  //   if (
  //     currentPlayer === "playerOne" &&
  //     !validButtons &&
  //     !hasHomeOrWon1 &&
  //     gameStarted
  //   ) {
  //     setcurrentPlayer("playerTwo");
  //     SetRefree("player 2 turn");
  //     alert("switched to player2");
  //   } else if (
  //     currentPlayer === "playerTwo" &&
  //     !validButtons &&
  //     !hasHomeOrWon2 &&
  //     gameStarted
  //   ) {
  //     setcurrentPlayer("playerOne");
  //     SetRefree("player 1 turn");
  //     alert("switched to player1");
  //   }
  // }, [button1Value, button2Value]);

  // This last useEffect would be to switch the currentPlayer if the player cant make any move, the only dependency should be clicked
  useEffect(() => {
    // Get an array of position of all redseeds, yellowseeds,blueseeds and greenseeds on the road;
    // if current Player is playerOne;
    // if redseeds.length !==0
    // for(let i =0; i <=redseeds.length; i++){
    //
    // }
    // If currentPlayer
    // you would have to use the home or won strings to check just incase there are no possible seeds outside
    // if true, check button1 value and but
  }, [clicked]);

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
                  <div
                    id={item}
                    onClick={moveSeed2}
                    ref={moveSeedRef}
                    className="yellow"
                  ></div>
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
