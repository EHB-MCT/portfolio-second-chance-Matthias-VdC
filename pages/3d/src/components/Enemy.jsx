import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
// import * as TWEEN from "@tweenjs/tween.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import shallow from "zustand/shallow";
import gsap from "gsap";

export default function Enemy(props) {
  const [path, takeDamage, enemyFrequency, setEnemiesPos, enemiesPos] =
    useStore((state) => [
      state.path,
      state.takeDamage,
      state.enemyFrequency,
      state.setEnemiesPos,
      state.enemiesPos,
    ]);
  const ref = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      if (ref.current) {
        setEnemiesPos(
          props.order,
          ref.current.position.x,
          ref.current.position.y,
          ref.current.position.z
        ); // pos, x, y, z
      }
    }, 2000);

    if (ref.current) {
      const timeline = new gsap.timeline();
      for (let i = 0; i <= path.length - 1; i++) {
        timeline.add(
          gsap.to(
            ref.current.position,
            {
              x: path[i][0],
              y: path[i][1],
              z: path[i][2],
              duration: Math.round(1 / props.speed),
              ease: "none",
              onUpdate: () => {
                // remove entire animation timeline if enemy does not exist (fixes dmg taken from invisible enemies after reset)
                if(ref.current === null) {
                  timeline.kill();
                }
              }
            },
            ">"
          )
        );
      }
      timeline.play().then(() => {
        if(typeof ref.current !== null) {
          takeDamage(1); // Enemy completed path
          clearInterval(timer);
        }
      });
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <mesh scale={0.5} position={path[0]} ref={ref} castShadow receiveShadow>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial color={"#faf"} attach="material" />
    </mesh>
  );
}
