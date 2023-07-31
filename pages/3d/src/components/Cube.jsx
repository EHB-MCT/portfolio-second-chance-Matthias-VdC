import React, { useState } from "react";
import { useBox } from "@react-three/cannon";
import * as textures from "../images/textures";
import { NearestFilter, RepeatWrapping } from "three/src/constants";
import { useStore } from "../hooks/useStore";
import shallow from "zustand/shallow";

export default function Cube({ position, texture }) {
  const [ref] = useBox(() => ({
    type: "Dynamic",
    position,
  }));
  const [isHovered, setIsHovered] = useState(false);

  const [addCube, removeCube] = useStore(
    (state) => [state.addCube, state.removeCube],
  );

  const activeTexture = textures[texture + "Texture"];

  activeTexture.repeat.set(1, 1);

  return (
    <mesh
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
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex / 2);
        console.log("face", clickedFace);
        const { x, y, z } = ref.current.position;
        console.log(e);
        if (e.shiftKey) {
          removeCube(x, y, z);
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
      ref={ref}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? "#faf" : "#fff"}
        map={activeTexture}
        attach="material"
      />
    </mesh>
  );
}
