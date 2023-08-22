import React, { useEffect, useState } from "react";
import Enemy from "./models/Enemy";
import { useStore } from "../hooks/useStore.js";
import { useFrame } from "@react-three/fiber";
import shallow from "zustand/shallow";
import gsap from "gsap";
import { Vector3 } from "three";

export default function Enemies() {
  const [enemies, roundPlaying, isReset, deletedTarget, resetDeletedTarget] =
    useStore((state) => [
      state.enemies,
      state.roundPlaying,
      state.isReset,
      state.deletedTarget,
      state.resetDeletedTarget,
    ]);

  const [enemyArr, setEnemyArr] = useState([]);

  useEffect(() => {
    if (roundPlaying) {
      spawnEnemy();
    }
  }, [roundPlaying]);

  useEffect(() => {
    if (deletedTarget !== undefined) {
      let newArr = enemyArr.filter((e) => e.props.order !== deletedTarget);
      setEnemyArr(newArr);
      resetDeletedTarget();
    }
  }, [deletedTarget]);

  const sleep = (millis) => {
    return new Promise((resolve) => setTimeout(resolve, millis));
  };

  async function spawnEnemy() {
    for (let i = 0; i < enemies.length; i++) {
      setEnemyArr((enemiesArr) => [...enemiesArr, enemies[i].node]);
      await sleep(3000);
    }
  }

  useEffect(() => {
    if (isReset) {
      //clear all timeouts & intervals to prevent errors and enemies spawning after round reset
      // https://stackoverflow.com/a/8860203
      let id = window.setTimeout(function () {}, 0);
      while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
      }
      // https://stackoverflow.com/a/7136044
      for (let i = 1; i < 99999; i++) window.clearInterval(i);

      setEnemyArr([]);
    }
  }, [isReset]);

  return <>{enemyArr}</>;
}
