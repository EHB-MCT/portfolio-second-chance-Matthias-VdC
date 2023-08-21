import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
// import * as TWEEN from "@tweenjs/tween.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import shallow from "zustand/shallow";
import gsap from "gsap";
import { useAnimations, useGLTF } from "@react-three/drei";
import useSkinnedMeshClone from "../hooks/useSkinnedMeshClone";
import { Vector3 } from "three";

export default function Enemy (props) {
  const [path, takeDamage, enemyFrequency, setEnemiesPos, enemiesPos, enemies] =
    useStore((state) => [
      state.path,
      state.takeDamage,
      state.enemyFrequency,
      state.setEnemiesPos,
      state.enemiesPos,
      state.enemies,
    ]);
  const {scene, materials, animations, nodes} = useSkinnedMeshClone("/models/knight/scene-transformed.glb"); // with 'clonable' option
  const ref = useRef(null);

  const { actions } = useAnimations(animations, ref);

  useEffect(() => {

    const timer = setInterval(() => {
      if (ref.current) {
        setEnemiesPos(
          props.order,
          ref.current.position.x,
          ref.current.position.y - 0.5,
          ref.current.position.z
        ); // pos, x, y, z
      }
    }, 1000);

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
              onStart: () => { // Enemy rotation
                if(!path[i + 1]) return
                if(path[i + 1][0] !== undefined) {
                  ref.current.lookAt(new Vector3(path[i + 1][0], path[i + 1][1] - 0.5, path[i + 1][2]));
                }
              },
              onUpdate: () => {
                // remove entire animation timeline if enemy does not exist (fixes dmg taken from invisible enemies after reset)
                if (ref.current === null) {
                  timeline.kill();
                  if(actions["Dark_Knight_Bones|Dark_Knight_Walk"] !== undefined) {
                    actions["Dark_Knight_Bones|Dark_Knight_Walk"].stop();
                  }
                }
              },
            },
            ">" // queue next gsap.to at the end of the previous one
          )
        );
      }
      timeline.play().then(() => {
        if (typeof ref.current !== null) {
          takeDamage(1, props.order); // Enemy completed path
          clearInterval(timer);
          if(actions["Dark_Knight_Bones|Dark_Knight_Walk"] !== undefined) {
            actions["Dark_Knight_Bones|Dark_Knight_Walk"].stop();
          }
        }
      });
    }

    if (actions) actions["Dark_Knight_Bones|Dark_Knight_Walk"].play();

    return () => clearInterval(timer);
  }, []);

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
        <group>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.Object_78.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_78.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            geometry={nodes.Object_79.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_79.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            geometry={nodes.Object_80.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_80.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            geometry={nodes.Object_82.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_82.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            geometry={nodes.Object_83.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_83.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <skinnedMesh
            geometry={nodes.Object_84.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_84.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/knight/scene-transformed.glb");