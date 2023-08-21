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
  const [playerPos, setPlayerPos] = useState({});
  const [playerRotation, setPlayerRotation] = useState({});

  useEffect(() => {
    socket.on("userPos", (e) => {
      setPlayerPos({
        id: e.id,
        x: e.x,
        y: e.y,
        z: e.z
      });
    });
  
    socket.on("userRotation", (e) => {
      setPlayerRotation({
        id: e.id,
        rotation: e.rotation,
      });
    });

    // return () => {
    //   socket.off("userPos");
    //   socket.off("userRotation");
    // }
  });

  return (
    <OtherPlayerModel
      key={playerPos.id}
      scale={0.5}
      position={[playerPos.x, playerPos.y - 1, playerPos.z]}
      rotation={playerRotation.rotation}
    />
  );
}
