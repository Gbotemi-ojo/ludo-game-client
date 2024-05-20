import React, { useState } from "react";
import "./Dice.css";

interface DiceProps {
  id: string;
}

const NewDice = (props: {
  id: string;
  style: React.CSSProperties;
  rollDice: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      className="cube"
      id={props.id}
      style={props.style}
      onClick={props.rollDice}
    >
      <div className="face front">
        <div className="dot center"></div>
      </div>
      <div className="face back">
        <div className="dot top-left"></div>
        <div className="dot bottom-right"></div>
      </div>
      <div className="face right">
        <div className="dot top-left"></div>
        <div className="dot center"></div>
        <div className="dot bottom-right"></div>
      </div>
      <div className="face left">
        <div className="dot top-left"></div>
        <div className="dot top-right"></div>
        <div className="dot bottom-left"></div>
        <div className="dot bottom-right"></div>
      </div>
      <div className="face top">
        <div className="dot top-left"></div>
        <div className="dot top-right"></div>
        <div className="dot center"></div>
        <div className="dot bottom-left"></div>
        <div className="dot bottom-right"></div>
      </div>
      <div className="face bottom">
        <div className="dot top-left"></div>
        <div className="dot top-right"></div>
        <div className="dot bottom-left"></div>
        <div className="dot bottom-right"></div>
        <div className="dot center-left"></div>
        <div className="dot center-right"></div>
      </div>
    </div>
  );
};

export default NewDice;
