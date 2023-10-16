import { useState } from "react";
import './dice.css'

function Dice(props: {dieValue : number; className : string; handleDie: void}) {
  // const {handleDie, dieValue} = props;
  // const randomizeDie =  setInterval(handleDie,100);
  // setTimeout(() => {
  //   clearInterval(randomizeDie);
  // }, 2000);


  if (props.dieValue === 1) {
    return (
      <div className={props.className} onClick={props.handleDie}>
        <div></div>
      </div>
    )
  }
  else if (props.dieValue === 2) {
    return (
      <div className={props.className} onClick={props.handleDie}>
        <div></div>
        <div></div>
      </div>
    )
  }
  else if (props.dieValue=== 3) {
    return (
      <div className={props.className} onClick={props.handleDie}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
  else if (props.dieValue === 4) {
    return (
      <div className={props.className} onClick={props.handleDie}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
  else if (props.dieValue === 5) {
    return (
      <div className={props.className} onClick={props.handleDie}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
  else if (props.dieValue === 6) {
    return (
      <div className={props.className} onClick={props.handleDie}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default Dice;