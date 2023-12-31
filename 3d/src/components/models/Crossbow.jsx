/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Urizel (https://sketchfab.com/urizel)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/balista-03022ca891e3440d815178003a466302
title: Balista
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useStore } from "../../hooks/useStore";
import { useBox } from "@react-three/cannon";
import { Quaternion, Vector3 } from "three";
import useInterval from "../../hooks/useInterval";

export default function Crossbow({ position, ...props }) {
  const [group] = useBox(() => ({
    type: "Dynamic",
    position,
  }));

  const [isHovered, setIsHovered] = useState(false);

  const { nodes, materials } = useGLTF("/models/crossbow/scene.gltf");

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

  const rotateRef = useRef(null);

  useInterval(async () => {
    let closeness = [];

    if (enemiesPos && roundPlaying) {
      let size = Object.keys(enemiesPos).length;
      for (let i = 0; i < size; i++) {
        // get closest enemy to turret
        let v1 = new Vector3(
          enemiesPos[i].x,
          enemiesPos[i].y,
          enemiesPos[i].z
        );
        if (Math.round(group.current.position.distanceTo(v1)) <= 6) {
          closeness[i] = Math.round(group.current.position.distanceTo(v1));
        } else {
          closeness[i] = 10;
        }
      }
      let closest = Math.min(...closeness);
      let index = closeness.indexOf(closest);
      if (closeness[index] <= 5) {
        // console.log(index);
        dealTurretDamage(2, index);
        // console.log(new Vector3(enemiesPos[index].x, enemiesPos[index].y, enemiesPos[index].z));
        group.current.lookAt(new Vector3(enemiesPos[index].x, enemiesPos[index].y, enemiesPos[index].z));
        // group.current.getWorldDirection(new Vector3(enemiesPos[index].x, enemiesPos[index].y, enemiesPos[index].z))
      }
    }
  }, 1000);

  return (
    <group
      scale={0.5}
      ref={group}
      dispose={null}
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        const { x, y, z } = group.current.position;
        if (e.shiftKey) {
          removeCube(x, y, z, 60);
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
    >
      <group
        ref={rotateRef}
        rotation={[-Math.PI / 2, 0, 0]}
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
          geometry={nodes.Object_2.geometry}
          material={materials.balista_mat_001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.balista_mat_001}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/crossbow/scene.gltf");
