import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Gameboard from "./gameboard";
import Dice from "../dice/dice";

describe("GameBoard", () => {
  it("starts with player1 Turn", () => {
    render(<Gameboard />);
    expect(screen.getByText("Player 1 Turn")).toBeInTheDocument();
  });

//   it("should increment count on click", async () => {
//     render(<Gameboard />);
//     const counter = screen.getByRole("button", { name: /count is/i });
//     expect(counter.textContent).toBe("count is 0");
//     await userEvent.click(counter);
//     expect(counter.textContent).toBe("count is 1");
//   });
});

describe('Gameflow', () => { 
    test("if player has a 6, seeds should be available to comeout", () => {

    });
    test("if player does not have a 6,seeds should not be available to comeout", () => {
        
    });
    test("if current player does not have any seeds on the road,onclick of  ", () => {
        
    })

 })

