import { nanoid } from "nanoid";
import React from "react";
import { useStore } from "../hooks/useStore";
import PathObject from "./PathObject";
import shallow from "zustand/shallow";

export default function Path() {
  const [path] = useStore((state) => [state.path]);

  return path.map((pos) => {
    return <PathObject key={nanoid()} pos={pos} />;
  });
}
