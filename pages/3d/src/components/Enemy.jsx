import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
// import * as TWEEN from "@tweenjs/tween.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import shallow from "zustand/shallow";
import gsap from "gsap";
import EnemyModel from "./models/EnemyModel";
import Reptile from "./models/Reptile";
import Soldier from "./models/Soldier";
import { useAnimations, useGLTF } from "@react-three/drei";
import Knight from "./models/Knight";

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
              y: path[i][1] - 0.5,
              z: path[i][2],
              duration: Math.round(1 / props.speed),
              ease: "none",
              onUpdate: () => {
                // remove entire animation timeline if enemy does not exist (fixes dmg taken from invisible enemies after reset)
                if (ref.current === null) {
                  timeline.kill();
                  actions["Dark_Knight_Bones|Dark_Knight_Walk"].stop();
                }
              },
            },
            ">"
          )
        );
      }
      timeline.play().then(() => {
        if (typeof ref.current !== null) {
          takeDamage(1); // Enemy completed path
          clearInterval(timer);
          actions["Dark_Knight_Bones|Dark_Knight_Walk"].stop();
        }
      });
    }

    return () => clearInterval(timer);
  }, []);

  const { nodes, materials, animations } = useGLTF(
    "/models/knight/scene-transformed.glb"
  );
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    if (actions) actions["Dark_Knight_Bones|Dark_Knight_Walk"].play();
  }, [actions]);

  /*
  Command: npx gltfjsx@6.2.11 ./public/models/knight/scene.gltf --shadows --transform 
  Files: ./public/models/knight/scene.gltf [274.17KB] > scene-transformed.glb [165.47KB] (40%)
  Author: guigodead (https://sketchfab.com/guigodead)
  License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
  Source: https://sketchfab.com/3d-models/dark-knight-4206f5ca17144cdfb8500b95fecd36e3
  Title: Dark Knight
  */
 
  return (
    <>
      <group
        ref={ref}
        scale={0.01}
        position={[path[0][0], path[0][1] - 0.5, path[0][2]]}
        castShadow
        receiveShadow
      >
        <group name="Sketchfab_Scene">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="Object_78"
            geometry={nodes.Object_78.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_78.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            name="Object_79"
            geometry={nodes.Object_79.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_79.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            name="Object_80"
            geometry={nodes.Object_80.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_80.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            name="Object_82"
            geometry={nodes.Object_82.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_82.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            name="Object_83"
            geometry={nodes.Object_83.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_83.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            name="Object_84"
            geometry={nodes.Object_84.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_84.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
      {/* <mesh scale={0.5} position={path[0]} castShadow receiveShadow>
        <boxGeometry attach="geometry" />
        <meshStandardMaterial color={"#faf"} attach="material" />
      </mesh> */}
    </>
  );
}
