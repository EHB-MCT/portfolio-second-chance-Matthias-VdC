import React from "react";
import { useStore } from "../hooks/useStore.js";
// import Crossbow from "../models/crossbow/Crossbow";
import Cube from "./Cube";
import Crossbow from "./models/Crossbow";
import shallow from "zustand/shallow";
import { Ram } from "./models/Ram.jsx";

export default function Cubes() {
  const [cubes] = useStore((state) => [state.cubes]);
  return cubes.map(({ key, pos, texture }) => {
    switch (texture) {
      default:
        return null;
      case "crossbow":
        return (
          <Crossbow key={key} position={[pos[0], pos[1] - 0.115, pos[2]]} />
        );
      case "ram":
        return <Ram key={key} position={[pos[0], pos[1] - 0.115, pos[2]]} />;
      case "grass":
        return <Cube key={key} position={pos} texture={texture} />;
    }
  });
}
