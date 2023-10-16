import "./gameboard.css";
import Dice from "../dice/dice";
import { useEffect, useState } from "react";
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

  function isPlayer1Valid() {
    const redSeed1Coordinate = redSeed1.position;
    const blueSeed1Coordinate = blueSeed1.position;
    if (currentPlayer === "playerOne") {
      if (roadflow.redRoad.includes(redSeed1Coordinate)) {
        return true;
      }
    } else if (currentPlayer === "playerTwo") {
      if (roadflow.blueRoad.includes(blueSeed1Coordinate)) {
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
  const handleDice = () => {
    setGameStarted(true);
    if (gameStarted && button3Value > 0) {
      return;
    }
    handleDie1();
    handleDie2();
  };

  const [redSeed1, setRedSeed1] = useState({
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

  const handleRedSeed1 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    setRedSeed1({
      display: "flex",
      color: "red",
      position: roadflow.redRoad[0],
      onRoad: true,
    });
    const redSeed1 = document.getElementById("red-seed-1");
    redSeed1.style.opacity = "0";
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
    const playersonTheRoad = redSeed1.onRoad || blueSeed1.onRoad;
    if (playersonTheRoad && combinedButtons === 0) {
      if (currentPlayer === "playerOne") {
        setcurrentPlayer("playerTwo");
        SetRefree("Player 2 Turn");
      } else if (currentPlayer === "playerTwo") {
        setcurrentPlayer("playerOne");
        SetRefree("Player 1 Turn");
      }
    }
  }, [clicked, redSeed1.position, blueSeed1.position]);

  // useEffect for handleRedSeed1
  useEffect(() => {
    if (redSeed1.onRoad) {
      const seed = document.getElementById(redSeed1.position);
      seed.style.opacity = "1";
      seed.style.background = "red";
    }
  }, [redSeed1.position]);
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
    if (redSeed1.position !== "r0" && button3Value === 0) {
      alert("changed");
    }
  }
  const handleBlueSeed1 = () => {
    if (currentButton.value !== 6) {
      return;
    }
    setBlueSeed1({
      display: "flex",
      color: "blue",
      position: roadflow.blueRoad[0],
      onRoad: true,
    });
    const blueSeed1 = document.getElementById("blue-seed-1");
    blueSeed1.style.opacity = "0";
    resetButtons();
  };
  useEffect(() => {
    if (blueSeed1.onRoad) {
      const seed = document.getElementById(blueSeed1.position);
      seed.style.opacity = "1";
      seed.style.background = "blue";
    }
  }, [blueSeed1.position]);
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
  function moveSeed(e) {
    if (currentButton.value === 0) {
      return;
    }
    // get coordinates of all seeds
    const allSeedCoordinates = [redSeed1.position, blueSeed1.position];
    console.log(allSeedCoordinates);
    const id = e.target.id;
    const currentSeedIndex = allSeedCoordinates.indexOf(id);
    let playerSeed = "";
    if (currentSeedIndex === 0) {
      playerSeed = "red";
    } else if (currentSeedIndex === 1) {
      playerSeed = "blue";
    }
    if (playerSeed === "red" && currentPlayer === "playerTwo") {
      return;
    } else if (playerSeed === "blue" && currentPlayer === "playerOne") {
      return;
    }
    if (currentPlayer === "playerOne" && playerSeed === "red") {
      const previousPosition = roadflow.redRoad.indexOf(redSeed1.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.redRoad[previousPosition]
      );
      destroyPreviousSeed.style.opacity = "0";
      setRedSeed1({
        display: "flex",
        color: "red",
        position: roadflow.redRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    } else if (currentPlayer === "playerTwo" && playerSeed === "blue") {
      const previousPosition = roadflow.blueRoad.indexOf(blueSeed1.position);
      const destroyPreviousSeed = document.getElementById(
        roadflow.blueRoad[previousPosition]
      );
      destroyPreviousSeed.style.opacity = "0";
      setBlueSeed1({
        display: "flex",
        color: "red",
        position: roadflow.blueRoad[previousPosition + currentButton.value],
        onRoad: true,
      });
    }
    resetButtons();
  }

  return (
    <section className="container">
      <h1>{refree}</h1>
      <section className="gameboard">
        <div className="column1 column">
          <div className="green-box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="road vertical-road yellow-road">
            {yellowRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveSeed}></div>
                </div>
              );
            })}
          </div>
          <div className="yellow-box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="column2 column">
          <div className="road-btw-box horizontal-road green-road">
            {greenRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveSeed}></div>
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
                  <div id={item} onClick={moveSeed}></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="column3 column">
          <div className="red-box">
            <div onClick={handleRedSeed1} id="red-seed-1"></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="road vertical-road red-road">
            {redRoadMap.map((item) => {
              return (
                <div>
                  <div id={item} onClick={moveSeed} />
                </div>
              );
            })}
          </div>
          <div className="blue-box">
            <div onClick={handleBlueSeed1} id="blue-seed-1"></div>
            <div></div>
            <div></div>
            <div></div>
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
