import { useEffect, useState } from "react";
import "./gameboard.css";
import Dice from "../dice/dice";
import roadflow from "./roadflow";

function Gameboard() {
  const [clicked, setClicked] = useState("");

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
    const redSeed1Coordinate = redSeed1.position;
    const redSeed2Coordinate = redSeed2.position;
    const redSeed3Coordinate = redSeed3.position;
    const redSeed4Coordinate = redSeed4.position;

    const blueSeed1Coordinate = blueSeed1.position;
    const blueSeed2Coordinate = blueSeed2.position;
    const blueSeed3Coordinate = blueSeed3.position;
    const blueSeed4Coordinate = blueSeed4.position;

    const yellowSeed1Coordinate = yellowSeed1.position;
    const yellowSeed2Coordinate = yellowSeed2.position;
    const yellowSeed3Coordinate = yellowSeed3.position;
    const yellowSeed4Coordinate = yellowSeed4.position;

    const greenSeed1Coordinate = greenSeed1.position;
    const greenSeed2Coordinate = greenSeed2.position;
    const greenSeed3Coordinate = greenSeed3.position;
    const greenSeed4Coordinate = greenSeed4.position;

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

  const [redSeed1, setRedSeed1] = useState({
    display: "none",
    color: "red",
    position: "r0",
    onRoad: false,
  });
  const [redSeed2, setRedSeed2] = useState({
    display: "none",
    color: "red",
    position: "r0",
    onRoad: false,
  });
  const [redSeed3, setRedSeed3] = useState({
    display: "none",
    color: "red",
    position: "r0",
    onRoad: false,
  });
  const [redSeed4, setRedSeed4] = useState({
    display: "none",
    color: "red",
    position: "r0",
    onRoad: false,
  });
  const [blueSeed1, setBlueSeed1] = useState({
    display: "flex",
    color: "blue",
    position: "b0",
    onRoad: false,
  });
  const [blueSeed2, setBlueSeed2] = useState({
    display: "flex",
    color: "blue",
    position: "b0",
    onRoad: false,
  });
  const [blueSeed3, setBlueSeed3] = useState({
    display: "flex",
    color: "blue",
    position: "b0",
    onRoad: false,
  });
  const [blueSeed4, setBlueSeed4] = useState({
    display: "flex",
    color: "blue",
    position: "b0",
    onRoad: false,
  });
  const [greenSeed1, setGreenSeed1] = useState({
    display: "flex",
    color: "green",
    position: "g0",
    onRoad: false,
  });
  const [greenSeed2, setGreenSeed2] = useState({
    display: "flex",
    color: "green",
    position: "g0",
    onRoad: false,
  });
  const [greenSeed3, setGreenSeed3] = useState({
    display: "flex",
    color: "green",
    position: "g0",
    onRoad: false,
  });
  const [greenSeed4, setGreenSeed4] = useState({
    display: "flex",
    color: "green",
    position: "g0",
    onRoad: false,
  });
  const [yellowSeed1, setYellowSeed1] = useState({
    display: "flex",
    color: "yellow",
    position: "y0",
    onRoad: false,
  });
  const [yellowSeed2, setYellowSeed2] = useState({
    display: "flex",
    color: "yellow",
    position: "y0",
    onRoad: false,
  });
  const [yellowSeed3, setYellowSeed3] = useState({
    display: "flex",
    color: "yellow",
    position: "y0",
    onRoad: false,
  });
  const [yellowSeed4, setYellowSeed4] = useState({
    display: "flex",
    color: "yellow",
    position: "y0",
    onRoad: false,
  });
  function chopSeed() {
    const seedPositions = [
      redSeed1.position,
      redSeed2.position,
      redSeed3.position,
      redSeed4.position,
      yellowSeed1.position,
      yellowSeed2.position,
      yellowSeed3.position,
      yellowSeed4.position,
      blueSeed1.position,
      blueSeed2.position,
      blueSeed3.position,
      blueSeed4.position,
      greenSeed1.position,
      greenSeed2.position,
      greenSeed3.position,
      greenSeed4.position,
    ];
    const player1SeedsId = [
      "red-seed-1",
      "red-seed-2",
      "red-seed-3",
      "red-seed-4",
      "yellow-seed-1",
      "yellow-seed-2",
      "yellow-seed-3",
      "yellow-seed-4",
    ];
    const player2SeedsId = [
      "blue-seed-1",
      "blue-seed-2",
      "blue-seed-3",
      "blue-seed-4",
      "green-seed-1",
      "green-seed-2",
      "green-seed-3",
      "green-seed-4",
    ];
    const repeatedItems = findRepeatedItems(seedPositions)[0];
    let player1Index = repeatedItems.indexes[0];
    let player2Index = repeatedItems.indexes[1];
    if (currentPlayer === "playerOne" && player1Index) {

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
    const allSeedCoordinates = [
      redSeed1.position,
      redSeed2.position,
      redSeed3.position,
      redSeed4.position,
      yellowSeed1.position,
      yellowSeed2.position,
      yellowSeed3.position,
      yellowSeed4.position,
      blueSeed1.position,
      blueSeed2.position,
      blueSeed3.position,
      blueSeed4.position,
      greenSeed1.position,
      greenSeed2.position,
      greenSeed3.position,
      greenSeed4.position,
    ];
    const repeatedElement = findRepeatedItems(allSeedCoordinates);
    if (repeatedElement.length === 0) {
      return;
    }
    for (let i = 0; i <= repeatedElement.length - 1; i++) {
      const repeated = document.getElementById(repeatedElement[i].item);
      if (repeated !== null) {
        repeated.textContent = repeatedElement[i].count.toString();
      }
    }
  }
  function reRenderSeeds() {
    const allSeedCoordinates = [
      redSeed1.position,
      redSeed2.position,
      redSeed3.position,
      redSeed4.position,
      yellowSeed1.position,
      yellowSeed2.position,
      yellowSeed3.position,
      yellowSeed4.position,
      blueSeed1.position,
      blueSeed2.position,
      blueSeed3.position,
      blueSeed4.position,
      greenSeed1.position,
      greenSeed2.position,
      greenSeed3.position,
      greenSeed4.position,
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
  });

  const seedCoordinates: string[] = ["a", "k", "c", "a", "d", "e", "b", "a"];
  const repeatedItems = findRepeatedItems(seedCoordinates);

  console.log(repeatedItems);

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
    setRedSeed1({
      display: "flex",
      color: "red",
      position: roadflow.redRoad[0],
      onRoad: true,
    });
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
    setRedSeed2({
      display: "flex",
      color: "red",
      position: roadflow.redRoad[0],
      onRoad: true,
    });
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
    setRedSeed3({
      display: "flex",
      color: "red",
      position: roadflow.redRoad[0],
      onRoad: true,
    });
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
    setRedSeed4({
      display: "flex",
      color: "red",
      position: roadflow.redRoad[0],
      onRoad: true,
    });
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
    setYellowSeed1({
      display: "flex",
      color: "yellow",
      position: roadflow.yellowRoad[0],
      onRoad: true,
    });
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
    setYellowSeed2({
      display: "flex",
      color: "yellow",
      position: roadflow.yellowRoad[0],
      onRoad: true,
    });
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
    setYellowSeed3({
      display: "flex",
      color: "yellow",
      position: roadflow.yellowRoad[0],
      onRoad: true,
    });
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
    setYellowSeed4({
      display: "flex",
      color: "yellow",
      position: roadflow.yellowRoad[0],
      onRoad: true,
    });
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
    setBlueSeed1({
      display: "flex",
      color: "blue",
      position: roadflow.blueRoad[0],
      onRoad: true,
    });
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
    setBlueSeed2({
      display: "flex",
      color: "blue",
      position: roadflow.blueRoad[0],
      onRoad: true,
    });
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
    setBlueSeed3({
      display: "flex",
      color: "blue",
      position: roadflow.blueRoad[0],
      onRoad: true,
    });
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
    setBlueSeed4({
      display: "flex",
      color: "blue",
      position: roadflow.blueRoad[0],
      onRoad: true,
    });
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
    setGreenSeed1({
      display: "flex",
      color: "green",
      position: roadflow.greenRoad[0],
      onRoad: true,
    });
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
    setGreenSeed2({
      display: "flex",
      color: "green",
      position: roadflow.greenRoad[0],
      onRoad: true,
    });
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
    setGreenSeed3({
      display: "flex",
      color: "green",
      position: roadflow.greenRoad[0],
      onRoad: true,
    });
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
    setGreenSeed4({
      display: "flex",
      color: "green",
      position: roadflow.greenRoad[0],
      onRoad: true,
    });
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
      redSeed1.onRoad ||
      redSeed2.onRoad ||
      redSeed3.onRoad ||
      redSeed4.onRoad ||
      yellowSeed1.onRoad ||
      yellowSeed2.onRoad ||
      yellowSeed3.onRoad ||
      yellowSeed4.onRoad ||
      greenSeed1.onRoad ||
      greenSeed2.onRoad ||
      greenSeed3.onRoad ||
      greenSeed4.onRoad ||
      blueSeed1.onRoad ||
      blueSeed2.onRoad ||
      blueSeed3.onRoad ||
      blueSeed4.onRoad;
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
    redSeed1.position,
    redSeed2.position,
    redSeed3.position,
    redSeed4.position,
    greenSeed1.position,
    greenSeed2.position,
    greenSeed3.position,
    greenSeed4.position,
    yellowSeed1.position,
    yellowSeed2.position,
    yellowSeed3.position,
    yellowSeed4.position,
    blueSeed1.position,
    blueSeed2.position,
    blueSeed3.position,
    blueSeed4.position,
  ]);

  // useEffect for handleRedSeed1 to handleRedSeed1
  useEffect(() => {
    if (redSeed1.onRoad) {
      const seed = document.getElementById(redSeed1.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "red";
      }
    }
  }, [redSeed1.position]);
  useEffect(() => {
    if (redSeed2.onRoad) {
      const seed = document.getElementById(redSeed2.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "red";
      }
    }
  }, [redSeed2.position]);
  useEffect(() => {
    if (redSeed3.onRoad) {
      const seed = document.getElementById(redSeed3.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "red";
      }
    }
  }, [redSeed3.position]);
  useEffect(() => {
    if (redSeed4.onRoad) {
      const seed = document.getElementById(redSeed4.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "red";
      }
    }
  }, [redSeed4.position]);

  // useEffect for handleBlueSeed1 to handleBlueSeed4
  useEffect(() => {
    if (blueSeed1.onRoad) {
      const seed = document.getElementById(blueSeed1.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "blue";
      }
    }
  }, [blueSeed1.position]);
  useEffect(() => {
    if (blueSeed2.onRoad) {
      const seed = document.getElementById(blueSeed2.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "blue";
      }
    }
  }, [blueSeed2.position]);
  useEffect(() => {
    if (blueSeed3.onRoad) {
      const seed = document.getElementById(blueSeed3.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "blue";
      }
    }
  }, [blueSeed3.position]);
  useEffect(() => {
    if (blueSeed4.onRoad) {
      const seed = document.getElementById(blueSeed4.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "blue";
      }
    }
  }, [blueSeed4.position]);
  // useEffect for greenseed1 to greenseed 4
  useEffect(() => {
    if (greenSeed1.onRoad) {
      const seed = document.getElementById(greenSeed1.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "green";
      }
    }
  }, [greenSeed1.position]);
  useEffect(() => {
    if (greenSeed2.onRoad) {
      const seed = document.getElementById(greenSeed2.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "green";
      }
    }
  }, [greenSeed2.position]);
  useEffect(() => {
    if (greenSeed3.onRoad) {
      const seed = document.getElementById(greenSeed3.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "green";
      }
    }
  }, [greenSeed3.position]);
  useEffect(() => {
    if (greenSeed4.onRoad) {
      const seed = document.getElementById(greenSeed4.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "green";
      }
    }
  }, [greenSeed4.position]);
  //  useEffect for yellowseed1 to yellowseed4
  useEffect(() => {
    if (yellowSeed1.onRoad) {
      const seed = document.getElementById(yellowSeed1.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "yellow";
      }
    }
  }, [yellowSeed1.position]);
  useEffect(() => {
    if (yellowSeed2.onRoad) {
      const seed = document.getElementById(yellowSeed2.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "yellow";
      }
    }
  }, [yellowSeed2.position]);
  useEffect(() => {
    if (yellowSeed3.onRoad) {
      const seed = document.getElementById(yellowSeed3.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "yellow";
      }
    }
  }, [yellowSeed3.position]);
  useEffect(() => {
    if (yellowSeed4.onRoad) {
      const seed = document.getElementById(yellowSeed4.position);
      if (seed !== null) {
        seed.style.opacity = "1";
        seed.style.background = "yellow";
      }
    }
  }, [yellowSeed4.position]);

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
    if (gameStarted === false) {
      return;
    }
    setCurrentButton({
      type: "button1",
      value: button1Value,
    });
  };
  const activateButton2 = () => {
    if (gameStarted === false) {
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
      redSeed1.position,
      redSeed2.position,
      redSeed3.position,
      redSeed4.position,
      yellowSeed1.position,
      yellowSeed2.position,
      yellowSeed3.position,
      yellowSeed4.position,
      blueSeed1.position,
      blueSeed2.position,
      blueSeed3.position,
      blueSeed4.position,
      greenSeed1.position,
      greenSeed2.position,
      greenSeed3.position,
      greenSeed4.position,
    ];
    console.log(allSeedCoordinates);
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
    const redseed1pos = roadflow.redRoad.indexOf(redSeed1.position);
    const redseed2pos = roadflow.redRoad.indexOf(redSeed2.position);
    const redseed3pos = roadflow.redRoad.indexOf(redSeed3.position);
    const redseed4pos = roadflow.redRoad.indexOf(redSeed4.position);

    const blueseed1pos = roadflow.blueRoad.indexOf(blueSeed1.position);
    const blueseed2pos = roadflow.blueRoad.indexOf(blueSeed2.position);
    const blueseed3pos = roadflow.blueRoad.indexOf(blueSeed3.position);
    const blueseed4pos = roadflow.blueRoad.indexOf(blueSeed4.position);

    const yellowSeed1pos = roadflow.yellowRoad.indexOf(yellowSeed1.position);
    const yellowSeed2pos = roadflow.yellowRoad.indexOf(yellowSeed2.position);
    const yellowSeed3pos = roadflow.yellowRoad.indexOf(yellowSeed3.position);
    const yellowSeed4pos = roadflow.yellowRoad.indexOf(yellowSeed4.position);

    const greenSeed1pos = roadflow.greenRoad.indexOf(greenSeed1.position);
    const greenSeed2pos = roadflow.greenRoad.indexOf(greenSeed2.position);
    const greenSeed3pos = roadflow.greenRoad.indexOf(greenSeed3.position);
    const greenSeed4pos = roadflow.greenRoad.indexOf(greenSeed4.position);

    if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed1pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(redSeed1.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setRedSeed1({
        display: "flex",
        color: "red",
        position: roadflow.redRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed2pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(redSeed2.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setRedSeed2({
        display: "flex",
        color: "red",
        position: roadflow.redRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed3pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(redSeed3.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setRedSeed3({
        display: "flex",
        color: "red",
        position: roadflow.redRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "red" &&
      id === roadflow.redRoad[redseed4pos]
    ) {
      const previousPosition = roadflow.redRoad.indexOf(redSeed4.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setRedSeed4({
        display: "flex",
        color: "red",
        position: roadflow.redRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed1pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(
        yellowSeed1.position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setYellowSeed1({
        display: "flex",
        color: "yellow",
        position: roadflow.yellowRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed2pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(
        yellowSeed2.position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setYellowSeed2({
        display: "flex",
        color: "yellow",
        position: roadflow.yellowRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed3pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(
        yellowSeed3.position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setYellowSeed3({
        display: "flex",
        color: "yellow",
        position: roadflow.yellowRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerOne" &&
      playerSeed === "yellow" &&
      id === roadflow.yellowRoad[yellowSeed4pos]
    ) {
      const previousPosition = roadflow.yellowRoad.indexOf(
        yellowSeed4.position
      );
      const destroyPreviousSeed = document.getElementById(
        roadflow.yellowRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setYellowSeed4({
        display: "flex",
        color: "yellow",
        position: roadflow.yellowRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed1pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(blueSeed1.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setBlueSeed1({
        display: "flex",
        color: "yellow",
        position: roadflow.blueRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed2pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(blueSeed2.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setBlueSeed2({
        display: "flex",
        color: "blue",
        position: roadflow.blueRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed3pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(blueSeed3.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setBlueSeed3({
        display: "flex",
        color: "blue",
        position: roadflow.blueRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "blue" &&
      id === roadflow.blueRoad[blueseed4pos]
    ) {
      const previousPosition = roadflow.blueRoad.indexOf(blueSeed4.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setBlueSeed4({
        display: "flex",
        color: "blue",
        position: roadflow.blueRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed1pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(greenSeed1.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setGreenSeed1({
        display: "flex",
        color: "green",
        position: roadflow.greenRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed2pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(greenSeed2.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setGreenSeed2({
        display: "flex",
        color: "green",
        position: roadflow.greenRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed3pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(greenSeed3.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setGreenSeed3({
        display: "flex",
        color: "green",
        position: roadflow.greenRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (
      currentPlayer === "playerTwo" &&
      playerSeed === "green" &&
      id === roadflow.greenRoad[greenSeed4pos]
    ) {
      const previousPosition = roadflow.greenRoad.indexOf(greenSeed4.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.greenRoad[previousPosition]
      );
      if (destroyPreviousSeed !== null) destroyPreviousSeed.style.opacity = "0";
      setGreenSeed4({
        display: "flex",
        color: "green",
        position: roadflow.greenRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
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
                  <div id={item} onClick={moveSeed2}></div>
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
                  <div id={item} onClick={moveSeed2}></div>
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
                  <div id={item} onClick={moveSeed2}></div>
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
                  <div id={item} onClick={moveSeed2} />
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
        >
          <div className="ludo-content3">{button1Value + button2Value}</div>
        </span>
      </div>
    </section>
  );
}

export default Gameboard;
