import React from "react";
import { usePlane } from "@react-three/cannon";
import { grassTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";
import shallow from "zustand/shallow";
import { useTexture } from "@react-three/drei";
import { NearestFilter, RepeatWrapping } from "three";

export default function Ground() {
  const [groundRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));
  const [addCube, path] = useStore(
    (state) => [state.addCube, state.path]
  );
  const p = useTexture({
    map: "./models/castle/textures/Terreno_TileMat_3_baseColor.jpeg",
  })

  p.map.magFilter = NearestFilter;
  p.map.wrapS = RepeatWrapping;
  p.map.wrapT = RepeatWrapping;
  p.map.repeat.set(6,6);

  // https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
  }

  grassTexture.repeat.set(100, 100);

  return (
    <>
      <mesh
        receiveShadow
        onClick={(e) => {
          //prevent cube from going throught the ground
          e.stopPropagation();
          let [x, y, z] = Object.values(e.point).map((val) => {
            return Math.ceil(val) - 0.5;
          });
          // sets a minimum value where blocks can be placed (no blocks underground)
          if (y < 0) {
            y = 0.5;
          }
          if (y >= 0.5) {
            for (let i of path) {
              if (arraysEqual([i[0], i[2]], [x, z])) return;
            }
            addCube(x, y, z);
          }
        }}
        ref={groundRef}
      >
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial attach="material" {...p} />
      </mesh>
    </>
  );
}
