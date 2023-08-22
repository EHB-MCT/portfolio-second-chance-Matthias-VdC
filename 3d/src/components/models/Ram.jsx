/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 ./public/models/ram/scene.gltf --shadows --transform 
Files: ./public/models/ram/scene.gltf [3.37KB] > scene-transformed.glb [23.41KB] (-595%)
Author: VitSh (https://sketchfab.com/VitSh)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/battering-ram-a97a70c411d94ac2bfd970fd80616fab
Title: Battering Ram
*/

import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useStore } from "../../hooks/useStore";
import useInterval from "../../hooks/useInterval";
import { Vector3 } from "three";

export function Ram({ position, ...props }) {
  const [group] = useBox(() => ({
    type: "Dynamic",
    position,
  }));
  const [
    addCube,
    removeCube,
    enemiesPos,
    dealTurretDamage,
    deleteEnemy,
    roundPlaying,
    getEnemiesPos,
  ] = useStore((state) => [
    state.addCube,
    state.removeCube,
    state.enemiesPos,
    state.dealTurretDamage,
    state.deleteEnemy,
    state.roundPlaying,
    state.getEnemiesPos,
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const { nodes, materials } = useGLTF("/models/ram/scene-transformed.glb");

  useInterval(async () => {
    let closeness = [];

    if (enemiesPos && roundPlaying) {
      let size = Object.keys(enemiesPos).length;
      for (let i = 0; i < size; i++) {
        // get closest enemy to turret
        let v1 = new Vector3(enemiesPos[i].x, enemiesPos[i].y, enemiesPos[i].z);
        if (Math.round(group.current.position.distanceTo(v1)) <= 3) {
          closeness[i] = Math.round(group.current.position.distanceTo(v1));
        } else {
          closeness[i] = 10;
        }
      }
      let closest = Math.min(...closeness);
      let index = closeness.indexOf(closest);
      if (closeness[index] <= 5) {
        // console.log(index);
        dealTurretDamage(8, index);
        // console.log(new Vector3(enemiesPos[index].x, enemiesPos[index].y, enemiesPos[index].z));
        group.current.lookAt(
          new Vector3(
            enemiesPos[index].x,
            enemiesPos[index].y,
            enemiesPos[index].z
          )
        );
        // group.current.getWorldDirection(new Vector3(enemiesPos[index].x, enemiesPos[index].y, enemiesPos[index].z))
      }
    }
  }, 1500);

  return (
    <group
      {...props}
      scale={0.25}
      dispose={null}
      position={[position[0], position[1] - 0.385, position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = group.current.position;
        if (e.shiftKey) {
          removeCube(x, y, z, 100);
          return;
        } else if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        } else if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        } else if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        } else if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        } else if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        } else if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
      castShadow
      receiveShadow
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_0.geometry}
        material={materials.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/ram/scene-transformed.glb");
