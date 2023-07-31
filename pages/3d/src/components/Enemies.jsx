import React, { useEffect, useState } from "react";
import Enemy from "./Enemy";
import { useStore } from "../hooks/useStore.js";
import { useFrame } from "@react-three/fiber";
import shallow from "zustand/shallow";

export default function Enemies() {
  const [enemies, endRound] = useStore((state) => [
    state.enemies,
    state.endRound,
  ]);

  useEffect(() => {
    if (enemies.length <= 0) {
      endRound();
    }
  }, [enemies]);

  return enemies.map(({ key, speed, order, max, health }) => (
    <Enemy key={key} speed={speed} order={order} max={max} />
  ));
}
