import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Vector3 } from "three";
import { socket } from "../hooks/useSocket";

export default function FirstPersonCamera() {
  const { camera, gl } = useThree();

  function updateRotation() {
      // https://stackoverflow.com/a/34329880 get x rotation in radians from euler angles
      let vector = camera.getWorldDirection(new Vector3());
      let theta = Math.atan2(vector.x, vector.z);
      socket.emit("rotationUpdate", { id: socket.id, rotation: theta });
  }

  return (
    <PointerLockControls
      makeDefault
      onChange={() => updateRotation()}
      args={[camera, gl.domElement]}
    />
  );
}
