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
      const [button3Value, setButton3Value] = useState(
        button1Value + button2Value
      );
      const updateButton3Value = () => {
        setButton3Value(button1Value + button2Value);
      };
      useEffect(() => {
        updateButton3Value();
      });
}