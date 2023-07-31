import React from "react";
import { useStore } from "../../hooks/useStore.js";
import "./Menu.css";
import shallow from "zustand/shallow";

export const Menu = () => {
  const [saveWorld, resetWorld, money, health, round, startRound, roundPlaying, gameOver] =
    useStore(
      (state) => [
        state.saveWorld,
        state.resetWorld,
        state.money,
        state.health,
        state.round,
        state.startRound,
        state.roundPlaying,
        state.gameOver,
      ]
    );

  return (
    <div className="menu">
      <h1>Money: ${money}</h1>
      <h1>Health: {health}</h1>
      <h1>Round: {round}</h1>
      <button onClick={() => saveWorld()}>SAVE</button>
      <button onClick={() => resetWorld()}>RESET</button>
      <button onClick={() => gameOver()}>GAME OVER</button>
      <button
        disabled={roundPlaying}
        onClick={() => {
          startRound();
        }}
      >
        Start Round
      </button>
    </div>
  );
};
