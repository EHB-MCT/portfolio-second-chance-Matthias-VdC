import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
// import * as TWEEN from "@tweenjs/tween.js";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import { Vector3 } from "three";
import gsap from "gsap";
import shallow from "zustand/shallow";

export default function Enemy(props) {
  const [path, enemyFrequency, setEnemiesPos, enemies, takeDamage] = useStore(
    (state) => [
      state.path,
      state.enemyFrequency,
      state.setEnemiesPos,
      state.enemies,
      state.takeDamage,
    ]
  );

  const ref = useRef();

  useEffect(() => {
    if (!!ref.current) {
      const timeline = new gsap.timeline({
        delay: enemyFrequency * (props.order - 1),
      });
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
              // onUpdate: () => {
              //   if (enemies[props.order - 1].health > 0) {
              //     setEnemiesPos(
              //       props.order,
              //       path[i][0],
              //       path[i][1],
              //       path[i][2]
              //     );
              //   }
              // },
            },
            ">"
          )
        );
      }
      timeline.play(() => {
        console.log("test");
      }).then(() => {
        // Enemy completed path
        takeDamage(1);
      });
    }
  }, []);

  return (
    <mesh scale={0.5} position={path[0]} castShadow receiveShadow ref={ref}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial color={"#faf"} attach="material" />
    </mesh>
  );
}
