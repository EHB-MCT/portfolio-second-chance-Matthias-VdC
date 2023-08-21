import React from "react";
import * as textures from "../images/textures";

export default function PathObject({ pos }) {
  const activeTexture = textures["stone" + "Texture"];
  return (
    <mesh position={[pos[0], -0.49, pos[2]]} castShadow receiveShadow>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial map={activeTexture} attach="material" />
    </mesh>
  );
}
