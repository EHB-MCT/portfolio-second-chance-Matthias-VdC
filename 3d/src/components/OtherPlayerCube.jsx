import React from "react";

export default function OtherPlayerCube({ position }) {
  return (
    <mesh scale={[1, 2, 1]} position={position} castShadow receiveShadow>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial color={"red"} attach="material" />
    </mesh>
  );
}
