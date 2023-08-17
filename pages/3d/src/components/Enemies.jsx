import React, { useEffect, useState } from "react";
import Enemy from "./Enemy";
import { useStore } from "../hooks/useStore.js";
import { useFrame } from "@react-three/fiber";
import shallow from "zustand/shallow";
import gsap from "gsap";
import { Vector3 } from "three";

export default function Enemies() {
  const [enemyArr, setEnemyArr] = useState([]);
  const [enemies, endRound, path, enemyFrequency, setEnemiesPos, takeDamage, isReset] =
    useStore((state) => [
      state.enemies,
      state.endRound,
      state.path,
      state.enemyFrequency,
      state.setEnemiesPos,
      state.takeDamage,
      state.isReset,
    ]);

  useEffect(() => {
    if (enemies.length <= 0 && !isReset) {
      setEnemyArr([]);
      endRound();
    } else {
      for (let i = 0; i < enemies.length; i++) {
        ((ind) => {
          setTimeout(() => {
            setEnemyArr((enemiesArr) => [...enemiesArr, <Enemy key={ind} speed={enemies[ind].speed} order={ind} />]);
          }, 3000 * ind);
        })(i);
      }
    }
  }, [enemies.length]);

  useEffect(() => {
    if (isReset) {
    //clear all timeouts & intervals to prevent errors and enemies spawning after round reset
    // https://stackoverflow.com/a/8860203
    let id = window.setTimeout(function() {}, 0);
    while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
    }
    // https://stackoverflow.com/a/7136044
    for (let i = 1; i < 99999; i++)
    window.clearInterval(i);

      setEnemyArr([]);
    }
  }, [isReset]);
  
  return <>{enemyArr}</>;
}
