import React, { useEffect, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { useStore } from "../hooks/useStore";
import HotBar from "./hud/HotBar";
import shallow from "zustand/shallow";

function TextureSelector() {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { crossbow, ram } = useKeyboard();

  useEffect(() => {
    const textures = { crossbow, ram };
    const pressedTexture = Object.entries(textures).find(
      ([key, value]) => value
    );
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [crossbow, ram, setTexture]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);

    return clearTimeout(timeout);
  }, [activeTexture]);

  return <HotBar activeTexture={activeTexture} />;
}

export default TextureSelector;
