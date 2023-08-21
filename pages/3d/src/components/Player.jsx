import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import React, { useEffect, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { socket } from "../hooks/useSocket";

const JUMP_FORCE = 3.5;
const SPEED = 4;

export default function Player() {
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboard();

  const { camera } = useThree();
  const [playerRef, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  useFrame(({ clock }) => {
    socket.emit("updatePos", {
      id: socket.id,
      x: pos.current[0],
      y: pos.current[1],
      z: pos.current[2],
    });
  });

  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    // front and side vectors correction towards camera
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }
  });

  return <mesh castShadow ref={playerRef}></mesh>;
}
