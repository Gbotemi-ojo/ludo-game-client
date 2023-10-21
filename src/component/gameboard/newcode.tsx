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
  const handleDie1 = () => {
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
  function validatePlayerMove() {
    let validity: boolean = false;
    if (currentPlayer === "playerOne") {
      for (let i = 0; i < 4; i++) {
        if (roadflow.redRoad.includes(seeds[i].position)) {
          validity = true;
        } else if (roadflow.yellowRoad.includes(seeds[i + 4].position)) {
          validity = true;
        } else {
          validity = false;
        }
      }
    } else if (currentPlayer === "playerTwo") {
      for (let i = 0; i < 4; i++) {
        if (roadflow.blueRoad.includes(seeds[i + 8].position)) {
          validity = true;
          return;
        } else if (roadflow.greenRoad.includes(seeds[i + 12].position)) {
          validity = true;
          return;
        } else {
          validity = false;
          return;
        }
      }
    }
    return validity;
  }
  // 596423

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
  const handleDice = () => {
    setGameStarted(true);
    if (gameStarted && button3Value > 0) {
      return;
    }
    handleDie1();
    handleDie2();
  };
  const [seeds, setSeeds] = useState([
    {
      id: "red-seed-1",
      position: "r0",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-2",
      position: "r0",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-3",
      position: "r0",
      color: "red",
      onroad: false,
    },
    {
      id: "red-seed-4",
      position: "r0",
      color: "red",
      onroad: false,
    },
    {
      id: "yellow-seed-1",
      position: "y0",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-2",
      position: "y0",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-3",
      position: "y0",
      color: "yellow",
      onroad: false,
    },
    {
      id: "yellow-seed-4",
      position: "r0",
      color: "yellow",
      onroad: false,
    },
    {
      id: "blue-seed-1",
      position: "r0",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-2",
      position: "r0",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-3",
      position: "r0",
      color: "blue",
      onroad: false,
    },
    {
      id: "blue-seed-4",
      position: "r0",
      color: "blue",
      onroad: false,
    },
    {
      id: "green-seed-1",
      position: "g0",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-2",
      position: "g0",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-3",
      position: "g0",
      color: "green",
      onroad: false,
    },
    {
      id: "green-seed-4",
      position: "g0",
      color: "green",
      onroad: false,
    },
  ]);

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
  const handleSeeds = (e) => {
    const allRoadFlows = [
      roadflow.redRoad,
      roadflow.yellowRoad,
      roadflow.blueRoad,
      roadflow.greenRoad,
    ];
    let currentRoadFlow;
    const seedId = e.target.id;
    const seedType = seedId[0];
    let seedIndex = -1;
    const playerOneSeedType = seedType === "r" || seedType === "y";
    const playerTwoSeedType = seedType === "b" || seedType === "g";
    const buttonType =
      currentButton.type === "button1" || currentButton.type === "button2";
    if (currentButton.value !== 6 && !buttonType) {
      return;
    }
    if (currentPlayer === "playerTwo" && playerOneSeedType) {
      return;
    }
    if (currentPlayer === "playerOne" && playerTwoSeedType) {
      return;
    }
    for (let i = 0; i < seeds.length - 1; i++) {
      if (seeds[i].id === seedId) {
        seedIndex = i;
        return;
      }
    }
    if (seedIndex < 4) {
      currentRoadFlow = allRoadFlows[0];
    } else if (seedIndex > 3 && seedIndex < 8) {
      currentRoadFlow = allRoadFlows[1];
    } else if (seedIndex > 7 && seedIndex < 12) {
      currentRoadFlow = allRoadFlows[2];
    } else if (seedIndex > 11) {
      currentRoadFlow = allRoadFlows[3];
    }
    updateSeed(seedIndex, true, currentRoadFlow[0]);
    const seed = document.getElementById(seedId);
    seed.style.opacity = "0";
    resetButtons();
  };

  // newUseEffect
  useEffect(() => {
    const isValid = validatePlayerMove();
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
    } else {
      const combinedButtons = button1Value + button2Value;
      let playerOneOnTheRoad = false;
      let playerTwoOnTheRoad = false;

      for (let i = 0; i < 8; i++) {
        if (seeds[i].onroad) {
          playerOneOnTheRoad = true;
        } else if (seeds[i + 8].onroad) {
          playerTwoOnTheRoad = true;
        }
      }
      if (
        currentPlayer === "playerOne" &&
        !playerOneOnTheRoad &&
        combinedButtons === 0
      ) {
        console.log("switched to 2");
        setcurrentPlayer("playerTwo");
        SetRefree("Player 2 Turn");
      } else if (
        currentPlayer === "playerTwo" &&
        !playerTwoOnTheRoad &&
        combinedButtons === 0
      ) {
        console.log("switched to 1");
        setcurrentPlayer("playerOne");
        SetRefree("Player 1 Turn");
      }
    }
  }, [clicked, seeds]);

  // useEffect for all seeds Together
  useEffect(() => {
    for (let i = 0; i <= seeds.length - 1; i++) {
      if (seeds[i].onroad) {
        const seed = document.getElementById(seeds[i].position);
        seed.style.opacity = "1";
        seed.style.background = seeds[i].color;
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

  function moveseed3(e) {
    if (currentButton.value === 0) {
      return;
    }
    const id = e.target.id;
    let allSeedCoordinates = [];
    for (let i = 0; i < 16; i++) {
      allSeedCoordinates.push(seeds[i].position);
    }
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
    // next
    const seedPositions = [];
    for (let i = 0; i < 4; i++) {
      seedPositions.push(roadflow.redRoad.indexOf(seeds[i].position));
    }
    for (let i = 0; i < 4; i++) {
      seedPositions.push(roadflow.yellowRoad.indexOf(seeds[i + 4].position));
    }
    for (let i = 0; i < 4; i++) {
      seedPositions.push(roadflow.blueRoad.indexOf(seeds[i + 8].position));
    }
    for (let i = 0; i < 4; i++) {
      seedPositions.push(roadflow.greenRoad.indexOf(seeds[i + 12].position));
    }
    console.log(seedPositions);
    // next 2
    for (let i = 0; i < 4; i++) {
      if (
        currentPlayer === "playerOne" &&
        playerSeed === "red" &&
        id === roadflow.redRoad[seedPositions[i]]
      ) {
        const previousPosition = seedPositions[i];
        const destroyPreviousSeed = document.getElementById(
          roadflow.redRoad[previousPosition]
        );
        destroyPreviousSeed.style.opacity = "0";
        updateSeed(
          i,
          true,
          roadflow.redRoad[previousPosition + currentButton.value]
        );
      }
    }
    resetButtons();
  }
  return (
    <section className="container">
      <h1>{refree}</h1>
      <section className="gameboard">
        <div className="column1 column">
          <div className="green-box">
            <div id="green-seed-1" onClick={handleSeeds}></div>
            <div id="green-seed-2" onClick={handleSeeds}></div>
            <div id="green-seed-3" onClick={handleSeeds}></div>
            <div id="green-seed-4" onClick={handleSeeds}></div>
          </div>
          <div className="road vertical-road yellow-road">
            {yellowRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveseed3}></div>
                </div>
              );
            })}
          </div>
          <div className="yellow-box">
            <div id="yellow-seed-1" onClick={handleSeeds}></div>
            <div id="yellow-seed-2" onClick={handleSeeds}></div>
            <div id="yellow-seed-3" onClick={handleSeeds}></div>
            <div id="yellow-seed-4" onClick={handleSeeds}></div>
          </div>
        </div>
        <div className="column2 column">
          <div className="road-btw-box horizontal-road green-road">
            {greenRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveseed3}></div>
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
                  <div id={item} onClick={moveseed3}></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="column3 column">
          <div className="red-box">
            <div onClick={handleSeeds} id="red-seed-1"></div>
            <div onClick={handleSeeds} id="red-seed-2"></div>
            <div onClick={handleSeeds} id="red-seed-3"></div>
            <div onClick={handleSeeds} id="red-seed-4"></div>
          </div>
          <div className="road vertical-road red-road">
            {redRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveseed3} />
                </div>
              );
            })}
          </div>
          <div className="blue-box">
            <div id="blue-seed-1" onClick={handleSeeds}></div>
            <div id="blue-seed-2" onClick={handleSeeds}></div>
            <div id="blue-seed-3" onClick={handleSeeds}></div>
            <div id="blue-seed-4" onClick={handleSeeds}></div>
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

// pseudo code for the ludo game
function findPropertiesWithSameValues(
  obj: Record<string, string>
): Record<string, string[]> {
  const valueToProperties: Record<string, string[]> = {};

  // Loop through the object properties and group them by their values
  for (const property in obj) {
    const value = obj[property];

    if (!valueToProperties[value]) {
      valueToProperties[value] = [property];
    } else {
      valueToProperties[value].push(property);
    }
  }

  // Filter and return the groups with more than one property
  const result: Record<string, string[]> = Object.keys(
    valueToProperties
  ).reduce((acc, value) => {
    if (valueToProperties[value].length > 1) {
      acc[value] = valueToProperties[value];
    }
    return acc;
  }, {});

  return result;
}

const obj: Record<string, string> = {
  property1: "r1",
  property2: "r2",
  property3: "r2",
  property4: "r2",
  property5: "r3",
  property6: "r4",
  property7: "r3",
  property8: "r5",
};

const propertiesWithSameValues = findPropertiesWithSameValues(obj);
console.log(propertiesWithSameValues);