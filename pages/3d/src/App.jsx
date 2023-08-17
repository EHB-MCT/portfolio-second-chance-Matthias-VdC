import { Physics } from "@react-three/cannon";
import { Environment, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import "./App.css";
import Cubes from "./components/Cubes";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Ground from "./components/Ground";
import Player from "./components/Player";
import TextureSelector from "./components/TextureSelector";
import { Menu } from "./components/hud/HUD";
import { NoToneMapping } from "three";
import Enemies from "./components/Enemies";
import Path from "./components/Path";
import OtherPlayers from "./components/OtherPlayers";
import GameOverScreen from "./components/hud/GameOverScreen";
import { useStore } from "./hooks/useStore";

function App() {
  const [isGameOver, enemies] = useStore((state) => [
    state.isGameOver,
    state.enemies,
  ]);

  return (
    <div id="canvas-container">
      <Canvas
        gl={{
          antialias: true,
          // toneMapping: NoToneMapping,
        }}
        shadows
        // linear
      >
        <Suspense>
          <Sky sunPosition={[100, 100, 20]} />
          <ambientLight intensity={0.5} />
          <FirstPersonCamera />
          <Physics>
            <Player />
            <OtherPlayers />
            <Cubes />
            <Path />
            <Enemies />
            {/* <Crossbow /> */}
            <Ground />
          </Physics>
          {/* <Environment preset="night" /> */}
        </Suspense>
      </Canvas>
      <Menu />
      <div id="cursor">+</div>
      <TextureSelector />
      {isGameOver ? <GameOverScreen /> : null}
    </div>
  );
}

export default App;
