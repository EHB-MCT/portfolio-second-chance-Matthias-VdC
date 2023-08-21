import React from "react";
import { useStore } from "../../hooks/useStore";
import "./GameOverScreen.css";

export default function GameOverScreen() {
  const [setRestartGame] = useStore((state) => [state.setRestartGame]);
  return (
    <div id="gameover-container">
      <h1>Game Over</h1>
      <a href="#" onClick={() => {setRestartGame()}}>restart</a>
    </div>
  );
}
