import React, { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import { socket } from "../hooks/useSocket";
import OtherPlayerModel from "./models/OtherPlayerModel";

export default function OtherPlayers() {
  const [money, round, cubes, roundPlaying] = useStore((state) => [
    state.money,
    state.round,
    state.cubes,
    state.roundPlaying,
  ]);
  const [playerPos, setPlayerPos] = useState([]);

  socket.on("update", (e) => {
    console.log(e);
  });
  socket.on("userPos", (e) => {
    if (playerPos.length < 2) {
      setPlayerPos([
        [...playerPos],
        {
          id: e.id,
          x: e.x,
          y: e.y,
          z: e.z,
        },
      ]);
    }
  });
  return playerPos.map(({ x, y, z, id }) => (
    <OtherPlayerModel key={id} scale={0.5} position={[x, y - 1, z]} />
  ));
}
